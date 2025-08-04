from django.urls import path
from . import views

urlpatterns = [
    path("files/", views.FileListCreate.as_view(), name="file-list"),
    path("files/delete/<int:pk>/", views.FileDelete.as_view(), name="delete-file"),
    path("files/download/<int:pk>/", views.FileDownload.as_view(), name="download-file"),
    path("share/<int:pk>/", views.ShareFileList.as_view(), name="share-file"),
    path("share/download/<int:pk>/", views.ShareFileDownload.as_view(), name="download-share-file"),
    path("files/update/<int:pk>/", views.UpdateFileEntry.as_view(), name="update-file"),
]