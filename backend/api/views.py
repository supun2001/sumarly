from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, UserData
from .serializer import UserSerializer, UserDataSerializer
import os
import hashlib
import assemblyai as aai
from mutagen.mp3 import MP3
import boto3
import logging
from django.contrib.auth.hashers import make_password
import uuid
import http.client
import json
import requests
import time
import io
import tempfile 
from urllib.parse import urlparse, parse_qs
from pydub import AudioSegment
from yt_dlp import YoutubeDL

# Set up AssemblyAI API key
aai.settings.api_key = settings.API_KEY

# AWS S3 client setup
s3_client = boto3.client('s3')

# Define constants
logger = logging.getLogger(__name__)
YTDLP_FNAME = 'downloads/%(title)s.%(ext)s'
TRANSCRIPTION_PARAMS = {
    'answer_format': "**<part of the lesson>**\n<list of important points in that part>",
    'max_output_size': 4000
}

def get_audio_length(file_path):
    audio = MP3(file_path)
    return audio.info.length

def generate_file_hash(file_path):
    hasher = hashlib.md5()
    with open(file_path, 'rb') as file:
        while chunk := file.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()  # Save the user first

        # Create UserData with default values
        default_data = {
            'user_type': 'Free',
            'transcript': 'None',
            'time' : 7200,
        }
        user_data = UserData.objects.create(author=user, **default_data)

        # Create and send confirmation token
        self.send_confirmation_email(user, user_data.token)

    def send_confirmation_email(self, user, token):
        full_url = f"{settings.SITE_URL}confirm_email?token={token}"

        subject = "Confirm your email address"
        message = f"Hi {user.username},\n\nPlease confirm your email address by clicking the following link:\n{full_url}"
        from_email = settings.DEFAULT_FROM_EMAIL

        send_mail(subject, message, from_email, [user.username])

class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        # Retrieve the UserData object with the given token
        confirmation_token = get_object_or_404(UserData, token=token)

        # Check if the token is already confirmed
        if confirmation_token.confirmed:
            return Response({"message": "Email already confirmed"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the token has expired
        if timezone.now() - confirmation_token.token_created_at > timezone.timedelta(hours=24):
            return Response({"message": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)

        # Activate the user account
        user = confirmation_token.author
        user.is_active = True
        user.save()

        # Mark the token as confirmed
        confirmation_token.confirmed = True
        confirmation_token.save()


        return Response({"message": "Email confirmed successfully"}, status=status.HTTP_200_OK)
    
class RequestPasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(User, username=email)

        # Generate a random token
        token = str(uuid.uuid4())


        # Update the UserData with the new token and reset the time
        user_data = get_object_or_404(UserData, author=user)
        user_data.token = token
        user_data.token_created_at = timezone.now()
        user_data.save()

        # Send the password reset email
        reset_url = f"{settings.SITE_URL}reset_password?token={token}"
        subject = "Reset Your Password"
        message = f"Hi {user.username},\n\nPlease reset your password by clicking the following link:\n{reset_url}"
        from_email = settings.DEFAULT_FROM_EMAIL

        send_mail(subject, message, from_email, [user.username])

        return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
    

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('password')

        if not token:
            return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate UUID format
        try:
            uuid_obj = uuid.UUID(token)
        except ValueError:
            return Response({"message": "Invalid token format"}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the UserData object with the given token
        try:
            user_data = UserData.objects.get(token=uuid_obj)
        except UserData.DoesNotExist:
            return Response({"message": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the token has expired
        if timezone.now() - user_data.token_created_at > timezone.timedelta(hours=24):
            return Response({"message": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's password
        user = user_data.author
        user.password = make_password(new_password)
        user.save()

        # Clear the token to prevent reuse
        updated_token = str(uuid.uuid4())
        user_data.token = updated_token
        user_data.save()

        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

class UserDataListCreate(generics.ListCreateAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserData.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class UserDataDelete(generics.DestroyAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserData.objects.filter(author=user)

class DownloadAndTranscribeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user_id = user.id
        context = request.data.get('context', '')

        try:
            if 'url' in request.data:
                youtube_url = request.data.get('url')
                if not youtube_url:
                    return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)
                
                audio_path, s3_file_key = self.download_from_youtube(youtube_url)
            elif 'file' in request.FILES:
                uploaded_file = request.FILES['file']
                s3_file_key = self.save_uploaded_file_to_s3(uploaded_file)
                audio_path = uploaded_file.name
            else:
                return Response({"error": "No URL or file provided"}, status=status.HTTP_400_BAD_REQUEST)

            user_data = UserData.objects.filter(author_id=user_id).first()
            if not user_data:
                return Response({"error": "UserData not found for the given user_id"}, status=status.HTTP_404_NOT_FOUND)

            current_time = user_data.time
            summary, new_time = self.transcribe_and_summarize(s3_file_key, user_id, context, current_time)
            return Response({
                "status": "success",
                "summary": summary,
                "remaining_time": new_time
            })
        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def download_from_youtube(self, youtube_url):
        api_url = "https://youtube-to-mp315.p.rapidapi.com/download"
        headers = {
            'x-rapidapi-key': settings.RAPIDAPI_KEY,
            'x-rapidapi-host': settings.RAPIDAPI_HOST,
            'Content-Type': "application/json"
        }
        querystring = {"url": youtube_url, "format": "mp3"}

        try:
            # Request conversion
            response = requests.post(api_url, headers=headers, params=querystring)
            response.raise_for_status()  # Raises an HTTPError for bad responses
            if response.status_code == 403:
                raise Exception("Access forbidden. Check API key or permissions.")
            
            data = response.json()
            download_url = data.get('downloadUrl')

            # Proceed to download the file if the download URL is available
            if download_url:
                local_file_path = self.download_file(download_url)
                s3_file_key = f'downloads/{os.path.basename(local_file_path)}'
                self.upload_to_s3(local_file_path, s3_file_key)
                os.remove(local_file_path)
                return local_file_path, s3_file_key
            else:
                raise Exception("Download URL not available.")
                
        except requests.RequestException as e:
            logger.error(f"API request exception: {str(e)}")
            raise


    def download_file(self, download_url):
        response = requests.get(download_url, stream=True)
        if response.status_code != 200:
            raise Exception(f"Download failed with status code {response.status_code}")
        local_file_path = f'/tmp/{os.path.basename(download_url)}'
        with open(local_file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)
        return local_file_path

    def save_uploaded_file_to_s3(self, uploaded_file):
        s3_file_key = f'uploads/{uploaded_file.name}'
        s3_client.upload_fileobj(uploaded_file, settings.AWS_STORAGE_BUCKET_NAME, s3_file_key)
        return s3_file_key

    def upload_to_s3(self, file_path, s3_file_key):
        s3_client.upload_file(file_path, settings.AWS_STORAGE_BUCKET_NAME, s3_file_key)

    def transcribe_and_summarize(self, s3_file_key, user_id, context, current_time):
        local_file_path = f'/tmp/{os.path.basename(s3_file_key)}'
        s3_client.download_file(settings.AWS_STORAGE_BUCKET_NAME, s3_file_key, local_file_path)

        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(local_file_path)

        params = TRANSCRIPTION_PARAMS.copy()
        if context:
            params['context'] = context
        
        summary = transcript.lemur.summarize(**params).response.strip().split('\n')

        audio_length = get_audio_length(local_file_path)

        new_time = max(current_time - audio_length, 0)
        user_data = UserData.objects.filter(author_id=user_id).first()
        if user_data:
            user_data.time = new_time
            user_data.transcript = transcript
            user_data.save()

        os.remove(local_file_path)
        return summary, new_time

class AskQuestionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get transcript and question from the request data
        transcript = request.data.get('transcript')
        question = request.data.get('question')
        
        # Initialize Lemur (ensure this matches the correct API usage)
        try:
            lemur = aai.Lemur()  # Ensure this initialization matches the API's requirements
        except Exception as e:
            return Response({'error': f'Failed to initialize Lemur: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Validate inputs
        if not transcript or not question:
            return Response({'error': 'Transcript and question are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Make the API call to get the result
            result = lemur.task(
                prompt=question, 
                input_text=transcript,
            )

            # Check if result.response is a string
            if isinstance(result.response, str):
                # Check if the response indicates an issue with copyrighted material
                if "copyrighted material" in result.response.lower():
                    return Response({'error': 'Cannot process copyrighted material'}, status=status.HTTP_400_BAD_REQUEST)
                
                # Directly use result.response as the answer
                answer = result.response
                return Response({'response': answer}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Unexpected response format from Lemur'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)