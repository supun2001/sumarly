from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.UserDataListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.UserDataDelete.as_view(), name="delete-note"),
    path('download/',views.DownloadAndTranscribeAPIView.as_view(),name="download_youtube_video"),
]
