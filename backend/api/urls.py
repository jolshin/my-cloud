from django.urls import path
from . import views

urlpatterns = [
    path("files/", views.FileListCreate.as_view(), name="file-list"),
    path("files/delete/<int:pk>/", views.FileDelete.as_view(), name="delete-file"),
]