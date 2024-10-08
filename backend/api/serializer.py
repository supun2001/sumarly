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
        fields = ["id", "user_type", "transcript", "created_at","time" ,"author","confirmed","token","paid","paid_date"]
        extra_kwargs = {"author": {"read_only": True}}
        
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ["id", "email", "password", "access_level", "accepted", "created_at"]
        extra_kwargs = {
            "password": {"write_only": True},  # Ensure password is write-only
            "created_at": {"read_only": True}  # Make created_at read-only
        }

    def create(self, validated_data):
        print(validated_data)
        admin = Admin.objects.create(**validated_data)
        return admin
    

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')

        try:
            admin = Admin.objects.get(email=email)
        except Admin.DoesNotExist:
            raise serializers.ValidationError("Admin with this email does not exist.")

        # You can still attach the admin object for further processing if needed
        attrs['admin'] = admin  
        return attrs