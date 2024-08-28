from django.urls import path
from . import views

urlpatterns = [
    # path('users/', get_user,name="get_user"),
    # path('user/create', create_user,name="create_user"),
    # path('user/<int:pk>', user_details,name="user_details"),
    path("notes/", views.UserDataListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.UserDataListCreate.as_view(), name="delete-note"),
    # path('download/',download_and_transcribe,name="download_youtube_video"),
]
