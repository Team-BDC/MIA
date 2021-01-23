from django.urls import path,include
from rest_framework import routers
from django.conf import settings 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


# 회원 갤러리 가져오기 
Image_list= ImageViewSet.as_view({"get":"list"})

#test
image_list= ImagerViewSet.as_view({"get":"list"})
gallery_list = GalleryViewSet.as_view({"get":"list", "post":"create"})
gallery_detail = GalleryViewSet.as_view({"get":"retrieve", "patch":"partial_update", "delete":"destroy"}),

urlpatterns = [ 
    path("gallery_test", gallery_list, name="gallery-list"),
    # path("gallery_test/<int:gallery_id>", gallery_detail, name="gallery-detail"),
    path("image_list/<int:gallery_id>", image_list, name="image_list"),
    path("image_list/<str:user_name>", Image_list, name="ImageList"),


    # Selfie2anime 
    # path('model/',call_model.as_view())

] 

