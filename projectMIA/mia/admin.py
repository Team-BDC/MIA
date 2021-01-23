from django.contrib import admin
from .models import *


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image_number', 'image_name', 'image_path', 'gallery']
    search_filds = ['image_number']


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['gallery_id', 'user', 'created_at']
    search_filds = ['gallery_id']