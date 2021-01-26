from django.urls import path,include
from rest_framework import routers
from django.conf import settings 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


# 회원 갤러리 가져오기 
Image_list= ImageViewSet.as_view({"get":"list"})

#test
# image_list= ImagerViewSet.as_view({"get":"list"})
gallery_list = GalleryViewSet.as_view({"get":"list", "post":"create"})


urlpatterns = [ 
    path("gallery_test", gallery_list, name="gallery-list"),

    # 유저 갤러리 가져오기
    path("image_list/<str:user_name>", Image_list, name="ImageList"),
    # 갤러리에 이미지 추가
    path("add_image/<str:user_name>", Image.as_view(), name="ImageAdd"),
    # Selfie2anime 
    path('model/',call_model.as_view())

] 


