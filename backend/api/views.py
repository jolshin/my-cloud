from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .serializers import FileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import File, UserProfile

from django.http import HttpResponse, HttpResponseForbidden
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from wsgiref.util import FileWrapper
import os

class HomeView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        user = request.user  
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "fullname": user.fullname,
            "is_staff": user.is_staff,
        }

        return Response(user_data)

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  

    def get_queryset(self):
        queryset = UserProfile.objects.all()

        return queryset
    
class UserDelete(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  

    def get_queryset(self):
        queryset = UserProfile.objects.all()

        return queryset
    
    def perform_destroy(self, instance):
        if instance.is_superuser:
            raise Exception("Cannot delete superuser.")
        instance.delete()

class UserUpdate(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  

    def get_queryset(self):
        queryset = UserProfile.objects.all()

        return queryset
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            raise serializer.ValidationError(serializer.errors)

class UserStorage(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  

    def get_queryset(self):
        queryset = File.objects.all()  
        pk = self.kwargs['pk']
        queryset = queryset.filter(owner=pk)

        return queryset

class FileCreate(generics.CreateAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):
        if serializer.is_valid():
            user = get_object_or_404(UserProfile, pk=self.request.data['owner'][0])
            if self.request.user.is_staff:
                serializer.save(owner=user)
            else:
                serializer.save(owner=self.request.user)
        else:
            raise serializer.ValidationError(serializer.errors)

class FileDelete(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        queryset = File.objects.all()
        user = self.request.user

        if not user.is_superuser:
            queryset = queryset.filter(
                owner=user
            )

        return queryset
    
class FileDownload(generics.RetrieveUpdateAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated] 

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
        
    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(File, pk=pk, share_link__isnull=False)

class ShareFileDownload(generics.RetrieveUpdateAPIView):
    serializer_class = FileSerializer
    permission_classes = [AllowAny]  

    def get(self, _, pk):
        file_instance = get_object_or_404(File, pk=pk)

        if file_instance.share_link is None:
            return HttpResponseForbidden("This file is not shared publicly.")
        with open(file_instance.content.path, 'rb') as f:
            wrapper = FileWrapper(f)
            response = HttpResponse(wrapper, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{file_instance.filename}"'
            response['Content-Length'] = os.path.getsize(file_instance.content.path)
            return response
        
    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(File, pk=pk, share_link__isnull=False)
        
class ShareFile(generics.RetrieveAPIView):
    serializer_class = FileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        pk = self.kwargs['pk']
        file_instance = get_object_or_404(File, pk=pk)
        if file_instance.share_link is None:
            return HttpResponseForbidden("This file is not shared publicly.")
        return get_object_or_404(File, pk=pk)
    
        
class UpdateFileEntry(generics.UpdateAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'pk'

    def get_queryset(self):
        queryset = File.objects.all()
        user = self.request.user
        if not user.is_superuser:
            queryset = queryset.filter(
                owner=user
            )

        return queryset






