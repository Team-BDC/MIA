from django.urls import path,include
from rest_framework import routers
from django.conf import settings 
from .views import GalleryView


urlpatterns = [ 
    path("gallery", GalleryView.as_view({"get": "list", "post": "add"}), name="galleries"),
    path("gallery/<int:gallery_id>", GalleryView.as_view({"get": "list"}), name="gallery"),
] 
