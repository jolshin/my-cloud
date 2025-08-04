from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import UserProfile, File

# Register your models here.
class UserProfileAdmin(UserAdmin):
    model = UserProfile
    list_display = ('username', 'email', 'fullname', 'is_active', 'is_staff', 'storage', 'last_login')
    search_fields = ('username', 'email', 'fullname')
    ordering = ('username',)

class FileAdmin(admin.ModelAdmin):
    model = File
    list_display = ('id', 'owner', 'filename', 'content', 'created_at', 'share_link', 'filepath', 'size', 'last_downloaded', 'description')
    search_fields = ('filename',)
    ordering = ('-created_at',)


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(File, FileAdmin)