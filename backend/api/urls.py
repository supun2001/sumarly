from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.UserDataListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.UserDataDelete.as_view(), name="delete-note"),
    path('sumary/',views.DownloadAndTranscribeAPIView.as_view(),name="download_youtube_video"),
    path('ask-question/', views.AskQuestionView.as_view(), name='ask-question'),
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('confirm-email/<uuid:token>/', views.ConfirmEmailView.as_view(), name='confirm_email'),
    path('request_password_reset/', views.RequestPasswordResetView.as_view(), name='request_password_reset'),
    path('reset_password/', views.ResetPasswordView.as_view(), name='reset_password'),
    path('contact_us/', views.ContactUsView.as_view(), name='contact_us'),
    path('admin_login/', views.AdminLoginView.as_view(), name='admin_login'),
    path('admin_reg/', views.AdminRegistrationView.as_view(), name='admin_reg'),
]

