from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import uuid
import os

def upload_path(instance, filename):
    # Use the user's storage UUID to create a unique path for each user's files
    return f'cloud/{instance.owner.storage}/{filename}'

class UserProfile(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=False)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=128, blank=False)  # Store  hashed password
    fullname = models.CharField(max_length=255, blank=False)
    storage = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # Unique storage identifier
    last_login = models.DateTimeField(auto_now=True)  # Track last login time

    def __str__(self):
        return self.fullname

class File(models.Model):
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='files')
    filename = models.CharField(max_length=255)
    share_link = models.CharField(max_length=255, blank=True, null=True)  # Unique share link for the file
    filepath = models.CharField(max_length=255, blank=True, null=True)  # Path to the file
    content = models.FileField(upload_to=upload_path)  # Store files in 'cloud' directory
    created_at = models.DateTimeField(auto_now_add=True)
    size = models.PositiveIntegerField(default=0)  # Store file size in bytes
    last_downloaded = models.DateTimeField(auto_now=True)  # Track last download time
    description = models.TextField(blank=True, null=True)  # Optional description field

    def __str__(self):
        return self.filename
    
    def delete(self):
        if self.content:
            if os.path.exists(os.path.join(settings.MEDIA_ROOT, self.content.name)):
                self.content.delete(save=False)
        super(File, self).delete()
        

 
