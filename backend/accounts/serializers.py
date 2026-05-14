from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices=['seeker', 'employer'],
        write_only=True
    )

    class Meta:
        model = User
        fields = ['username', 'email','password', 'role']

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Profile.objects.create(user=user, role=role)
        return user

    def to_representation(self, instance):
        return {
            'username': instance.username,
            'email': instance.email,
            'message': 'Registration successful! 🎉'
        }


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    class Meta:
        model = Profile
        fields = ['username', 'email', 'role', 'phone', 'location', 'bio']