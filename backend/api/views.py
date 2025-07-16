from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .serializers import FileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import File, UserProfile

from django.http import HttpResponse, HttpResponseForbidden
from django.views import View
from django.shortcuts import get_object_or_404

from wsgiref.util import FileWrapper
import os

class FileListCreate(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get_queryset(self):
        queryset = File.objects.all()
        user = self.request.user

        if not user.is_superuser:
            queryset = queryset.filter(
                owner=user
            )

        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            raise serializer.ValidationError(serializer.errors)

class FileDelete(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete notes

    def get_queryset(self):
        queryset = File.objects.all()
        user = self.request.user

        if not user.is_superuser:
            queryset = queryset.filter(
                owner=user
            )

        return queryset
    
class FileDownload(generics.RetrieveAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can download files

    def get(self, request, pk):
        file_instance = get_object_or_404(File, pk=pk)
        if request.user != file_instance.owner and not request.user.is_superuser:
            return HttpResponseForbidden("You do not have permission to download this file.")

        with open(file_instance.content.path, 'rb') as f:
            wrapper = FileWrapper(f)
            response = HttpResponse(wrapper, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{file_instance.filename}"'
            response['Content-Length'] = os.path.getsize(file_instance.content.path)
            return response
    

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user to create an account

