from django.urls import path
from .views import *

urlpatterns = [
    path('users/', get_user,name="get_user"),
    path('user/create', create_user,name="create_user"),
    path('user/<int:pk>', user_details,name="user_details"),
    path('download/',download_and_transcribe,name="download_youtube_video"),
]
