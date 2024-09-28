from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class UserData(models.Model):
    user_type = models.CharField(max_length=100)  # Type of user (e.g., Free, Premium)
    transcript = models.TextField()  # Additional data for the user
    created_at = models.DateTimeField(auto_now_add=True)  # When the data was created
    time = models.PositiveIntegerField(default=900)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")  # User associated with this data
    token = models.UUIDField(default=uuid.uuid4, editable=False)  # Unique token for email confirmation
    token_created_at = models.DateTimeField(default=timezone.now)  # When the token was created
    confirmed = models.BooleanField(default=False) 

    def __str__(self):
        return str(self.time)
    
