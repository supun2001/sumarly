from django.db import models

class User(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    user_type = models.CharField(max_length=50)
    time = models.IntegerField()


    def __str__(self):
        return self.email