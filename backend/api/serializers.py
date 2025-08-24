from rest_framework import serializers
from .models import File, UserProfile
import os

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'password', 'fullname', 'storage', 'last_login', 'is_staff']
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
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret 
    
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'owner', 'filename', 'content', 'created_at', 'share_link', 'filepath', 'byte_size', 'last_downloaded', 'description']
        extra_kwargs = {
            'owner': {'read_only': True},
        }

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['content'] = os.path.basename(ret['content']) if ret['content'] else None
        ret['owner'] = UserSerializer(instance.owner).data['username'] if instance.owner else None
        
        return ret
    


