from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .serializers import FileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import File, UserProfile

class FileListCreate(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user)  # Return notes only for the authenticated user
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            raise serializer.ValidationError(serializer.errors)

class FileDelete(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete notes

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user)  # Return notes only for the authenticated user
    
class FileDownload(generics.RetrieveAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can download files

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user)  # Return files only for the authenticated user
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        response = super().retrieve(request, *args, **kwargs)
        response['Content-Disposition'] = f'attachment; filename="{instance.filename}"'
        return response

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user to create an account

