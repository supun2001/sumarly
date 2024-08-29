from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    user_type = models.CharField(max_length=100)
    transcript = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    time = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return str(self.time)