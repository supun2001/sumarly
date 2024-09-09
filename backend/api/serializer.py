from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ["id", "user_type", "transcript", "created_at","time" ,"author","confirmed","token"]
        extra_kwargs = {"author": {"read_only": True}}