from django.urls import path,include
from rest_framework import routers
from django.conf import settings 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


# 회원 갤러리 가져오기 
Image_list= ImageViewSet.as_view({"get":"list"})

urlpatterns = [ 
    # gallery
    # path("image_list/<int:gallery_id>", image_list,name="image_list"),
    path("gallery/<int:user_id>", Image_list , name="gallery"),


    # Selfie2anime 
    path('model/',call_model.as_view())

] 

