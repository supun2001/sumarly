from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer
from yt_dlp import YoutubeDL
import os
import hashlib
import assemblyai as aai
from django.conf import settings
from django.core.files.storage import default_storage
from mutagen.mp3 import MP3
from django.shortcuts import get_object_or_404


aai.settings.api_key = settings.API_KEY

# Define constants
YTDLP_FNAME = 'downloads/%(title)s.%(ext)s'
TRANSCRIPTION_PARAMS = {
    'answer_format': "**<part of the lesson>**\n<list of important points in that part>",
    'max_output_size': 4000
}

def get_audio_length(file_path):
    """Get the length of the audio file in seconds."""
    audio = MP3(file_path)
    return audio.info.length

def generate_file_hash(file_path):
    """Generate a hash for the file to check for duplicates."""
    hasher = hashlib.md5()
    with open(file_path, 'rb') as file:
        while chunk := file.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()


@api_view(['GET'])
def get_user(req):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(req):
    serializer = UserSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_details(req, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif req.method == 'PUT':
        serializer = UserSerializer(user, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif req.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def download_and_transcribe(request):
    user_id = request.data.get('user_id')
    if 'url' in request.data:
        youtube_url = request.data.get('url')
        context = request.data.get('context', '')

        if not youtube_url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Set up yt-dlp options
            ydl_opts = {
                'format': 'bestaudio/best',  # Download the best audio quality
                'outtmpl': YTDLP_FNAME,      # Filename template for downloaded files
                'postprocessors': [{         # Convert the audio to mp3
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
            }

            # Create the downloads directory if it doesn't exist
            os.makedirs('downloads', exist_ok=True)

            # Remove existing files with the same content
            for file in os.listdir('downloads'):
                if file.endswith('.mp3'):
                    file_path = os.path.join('downloads', file)
                    os.remove(file_path)

            # Download and convert the video to audio
            with YoutubeDL(ydl_opts) as ydl:
                ydl.download([youtube_url])

            # List downloaded files
            downloaded_files = [file for file in os.listdir('downloads') if file.endswith('.mp3')]
            if not downloaded_files:
                raise FileNotFoundError("No MP3 files found after download.")

            # Return the path of the first downloaded MP3 file
            audio_path = os.path.join('downloads', downloaded_files[0])
        
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        context = request.data.get('context', '')

        # Save the uploaded file to the downloads directory
        file_path = os.path.join('downloads', uploaded_file.name)
        with default_storage.open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        audio_path = file_path

    else:
        return Response({"error": "No URL or file provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Transcribe and summarize
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_path)

        params = {
            'answer_format': "**<part of the lesson>**\n<list of important points in that part>",
            'max_output_size': 4000
        }
        if context:
            params['context'] = context
        
        summary = transcript.lemur.summarize(**params)

        print("Transcript:", transcript) 

        # Get the length of the audio file
        audio_length = get_audio_length(audio_path)

        if user_id:
            user = get_object_or_404(User, pk=user_id)
            current_time = user.time  # Fetch the current time value
            new_time = max(current_time - audio_length, 0)  # Ensure the time is not negative
            user.time = new_time
            user.save()

        # Clean up the file if it was from a URL
        if 'url' in request.data:
            os.remove(audio_path)

        return Response({
            "status": "success",
            "summary": summary.response.strip().split('\n'),
            "remaining_time": new_time if user_id else None
        })

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)