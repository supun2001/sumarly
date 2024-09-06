from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from yt_dlp import YoutubeDL
import os
import hashlib
import assemblyai as aai
from django.conf import settings
from django.core.files.storage import default_storage
from mutagen.mp3 import MP3
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
import logging

aai.settings.api_key = settings.API_KEY

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
            'time': 7200, 
            # Add other fields as necessary
        }
        UserData.objects.create(author=user, **default_data)


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
                audio_path = self.download_from_youtube(youtube_url)
            except Exception as e:
                return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Handle file upload input
        elif 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            audio_path = self.save_uploaded_file(uploaded_file)
        else:
            return Response({"error": "No URL or file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Process transcription and summarization
        try:
            summary, new_time = self.transcribe_and_summarize(audio_path, user_id, context)
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
            'outtmpl': 'downloads/%(title)s.%(ext)s',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        os.makedirs('downloads', exist_ok=True)

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])

        downloaded_files = [file for file in os.listdir('downloads') if file.endswith('.mp3')]
        if not downloaded_files:
            raise FileNotFoundError("No MP3 files found after download.")

        return os.path.join('downloads', downloaded_files[0])

    def save_uploaded_file(self, uploaded_file):
        file_path = os.path.join('downloads', uploaded_file.name)
        with default_storage.open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
        return file_path

    def transcribe_and_summarize(self, audio_path, user_id, context):
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_path)

        params = TRANSCRIPTION_PARAMS.copy()
        if context:
            params['context'] = context
        
        summary = transcript.lemur.summarize(**params).response.strip().split('\n')

        audio_length = get_audio_length(audio_path)

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

        if 'url' in self.request.data:
            os.remove(audio_path)

        return summary, new_time
    

class AskQuestionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Get transcript and question from the request data
        transcript = request.data.get('transcript')
        question = request.data.get('question')
        
        # Initialize Lemur (ensure this matches the correct API usage)
        lemur = aai.Lemur()

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
                # Directly use result.response as the answer
                answer = result.response
                return Response({'response': answer}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Unexpected response format from Lemur'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)