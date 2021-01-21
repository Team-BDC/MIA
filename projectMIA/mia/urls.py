from django.urls import path,include
from rest_framework import routers
from django.conf import settings 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

gallery_list = GalleryViewSet.as_view({"get":"list", "post":"create"})
gallery_detail = GalleryViewSet.as_view({"get":"retrieve", "patch":"partial_update", "delete":"destroy"})

urlpatterns = [ 
    # path("gallery", GalleryView.as_view({"get": "list", "post": "add"}), name="galleries"),
    # path("gallery/<int:gallery_id>", GalleryView.as_view({"get": "list"}), name="gallery"),

    # # test redux 
    # path("gallery_test", gallery_list, name="gallery-list"),
    # path("gallery_test/<int:gallery_id>", gallery_detail, name="gallery-detail"),

    path("v1/test", TestView.as_view({"get": "list", "post": "add"}), name="tests"),
    path("v1/test/<int:test_num>", TestView.as_view({"get": "list"}), name="test"),
    path('model/',views.call_model.as_view())

] 

