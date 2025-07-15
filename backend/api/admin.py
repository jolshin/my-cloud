from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import UserProfile, File

# Register your models here.
class UserProfileAdmin(UserAdmin):
    model = UserProfile
    list_display = ('username', 'email', 'fullname', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'fullname')
    ordering = ('username',)

class FileAdmin(admin.ModelAdmin):
    model = File
    list_display = ('owner', 'filename', 'content', 'created_at')
    search_fields = ('filename',)
    ordering = ('-created_at',)

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(File, FileAdmin)