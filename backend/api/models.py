from django.db import models
from django.contrib.auth.models import AbstractUser

class UserProfile(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=False)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=128, blank=False)  # Store hashed password
    fullname = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.fullname

class File(models.Model):
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='files')
    filename = models.CharField(max_length=255)
    content = models.FileField(upload_to='cloud/')  # Store files in 'cloud' directory
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename
    

 
