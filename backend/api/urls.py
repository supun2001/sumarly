from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.UserDataListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.UserDataDelete.as_view(), name="delete-note"),
    path('sumary/',views.DownloadAndTranscribeAPIView.as_view(),name="download_youtube_video"),
    path('ask-question/', views.AskQuestionView.as_view(), name='ask-question'),
]
