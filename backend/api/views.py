from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
from .models import User, UserData
from .serializer import UserSerializer, UserDataSerializer
from yt_dlp import YoutubeDL
import os
import hashlib
import assemblyai as aai
from mutagen.mp3 import MP3
import boto3
import logging

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
        print(f"Confirmation: {confirmation_token.confirmed}")


        return Response({"message": "Email confirmed successfully"}, status=status.HTTP_200_OK)


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

        # Handle YouTube URL input
        if 'url' in request.data:
            youtube_url = request.data.get('url')

            if not youtube_url:
                return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                audio_path, s3_file_key = self.download_from_youtube(youtube_url)
            except Exception as e:
                return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Handle file upload input
        elif 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            s3_file_key = self.save_uploaded_file_to_s3(uploaded_file)
            audio_path = uploaded_file.name  # This can be used for processing if needed
        else:
            return Response({"error": "No URL or file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Process transcription and summarization
        try:
            summary, new_time = self.transcribe_and_summarize(s3_file_key, user_id, context)
            return Response({
                "status": "success",
                "summary": summary,
                "remaining_time": new_time if user_id else None
            })
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def download_from_youtube(self, youtube_url):
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': '/tmp/%(title)s.%(ext)s',  # Use /tmp for temporary storage
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])

        downloaded_files = [file for file in os.listdir('/tmp') if file.endswith('.mp3')]
        if not downloaded_files:
            raise FileNotFoundError("No MP3 files found after download.")

        local_file_path = os.path.join('/tmp', downloaded_files[0])
        s3_file_key = f'downloads/{downloaded_files[0]}'

        self.upload_to_s3(local_file_path, s3_file_key)

        os.remove(local_file_path)  # Clean up the local file after uploading

        return local_file_path, s3_file_key

    def save_uploaded_file_to_s3(self, uploaded_file):
        s3_file_key = f'uploads/{uploaded_file.name}'
        s3_client.upload_fileobj(uploaded_file, settings.AWS_STORAGE_BUCKET_NAME, s3_file_key)
        return s3_file_key

    def upload_to_s3(self, file_path, s3_file_key):
        s3_client.upload_file(file_path, settings.AWS_STORAGE_BUCKET_NAME, s3_file_key)

    def transcribe_and_summarize(self, s3_file_key, user_id, context):
        # Download the file from S3 to a temporary local path for processing
        local_file_path = f'/tmp/{os.path.basename(s3_file_key)}'
        s3_client.download_file(settings.AWS_STORAGE_BUCKET_NAME, s3_file_key, local_file_path)

        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(local_file_path)

        params = TRANSCRIPTION_PARAMS.copy()
        if context:
            params['context'] = context
        
        summary = transcript.lemur.summarize(**params).response.strip().split('\n')

        audio_length = get_audio_length(local_file_path)

        new_time = None
        if user_id:
            user_data = UserData.objects.filter(author_id=user_id).first()
            if not user_data:
                raise NotFound(detail="UserData not found for the given user_id")
            current_time = user_data.time
            new_time = max(current_time - audio_length, 0)
            user_data.time = new_time
            user_data.transcript = transcript
            user_data.save()

        os.remove(local_file_path)  # Clean up the local file after processing

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