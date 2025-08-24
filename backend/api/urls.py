from django.urls import path
from . import views

urlpatterns = [
    # API root and user management endpoints
    path("home/", views.HomeView.as_view(), name="home"),
    path("users/", views.UserList.as_view(), name="user-list"),
    path("user/update/<int:pk>/", views.UserUpdate.as_view(), name="user-update"),
    path("user/delete/<int:pk>/", views.UserDelete.as_view(), name="user-delete"),
    path("user/store/<int:pk>/", views.UserStorage.as_view(), name="user-storage"),
    # File management endpoints
    path("files/", views.FileCreate.as_view(), name="create-file"),
    path("files/delete/<int:pk>/", views.FileDelete.as_view(), name="delete-file"),
    path("files/download/<int:pk>/", views.FileDownload.as_view(), name="download-file"),
    path("share/<int:pk>/", views.ShareFile.as_view(), name="share-file"),
    path("share/download/<int:pk>/", views.ShareFileDownload.as_view(), name="download-share-file"),
    path("files/update/<int:pk>/", views.UpdateFileEntry.as_view(), name="update-file"),
]