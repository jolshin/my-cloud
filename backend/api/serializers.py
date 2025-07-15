from rest_framework import serializers
from .models import File, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'password', 'fullname']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = UserProfile(
            username=validated_data['username'],
            email=validated_data['email'],
            fullname=validated_data['fullname']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'owner', 'filename', 'content', 'created_at']
        extra_kwargs = {
            'owner': {'read_only': True},
        }


