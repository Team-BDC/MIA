from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, mixins, permissions
import tensorflow as tf # tensorflow 1.13.1+
import cv2
import dlib
import numpy as np
import matplotlib.pyplot as plt
import os
from glob import glob
# from .apps import Selfie2AnimeConfig
#import PIL
from PIL import Image as Pimg
from django.http import Http404
from drf_yasg.inspectors.base import openapi
from drf_yasg.utils import swagger_auto_schema, no_body
from .serializers import *
from .models import *
from django.views import View 


# 리액트 연동 테스트용 뷰. viewset을 이용, get, post, put, delete 가능
class GalleryView(viewsets.GenericViewSet, mixins.ListModelMixin, View):
    serializer_class = GallerySerializer
    
    @swagger_auto_schema(query_serializer=GallerySerializer)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        conditions = {
            'gallery_id': self.kwargs.get("gallery_id", None),
            'created_at': self.kwargs.get("created_at", None),
            'user': self.kwargs.get("user", None),
        }
        conditions = {key: val for key, val in conditions.items() if val is not None}
        galleries = Gallery.objects.filter(**conditions)
        if not galleries.exists():
            raise Http404

        return galleries

    def add(self, request): 
        galleries = Gallery.objects.filter(**request.data)
        if galleries.exists():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        gallery_serializer = GallerySerializer(data=request.data, partial=True)
        if not gallery_serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        gallery = gallery_serializer.save()

        return Response(GallerySerializer(gallery).data, status=status.HTTP_201_CREATED)


class ImagerViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all()

    def perform_create(self, serializer):
        serializer.save()



class GalleryViewSet(viewsets.ModelViewSet):
    serializer_class = GallerySerializer

    def get_queryset(self):
        return Gallery.objects.all()

    def perform_create(self, serializer):
        serializer.save()


# class GalleryViewSet(viewsets.ModelViewSet):
#     serializer_class = GallerySerializer

#     def get_queryset(self):
#         return Gallery.objects.all().order_by("-created_at")

#     def perform_create(self, serializer):
#         serializer.save()


class ImageViewSet(viewsets.ModelViewSet):
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GallerySerializer

    def get_queryset(self):
        galleries = Gallery.objects.all()
        gallery = galleries.filter(user_id=request.user.user_id)
        images = Image.objects.all()
        image_list = images.filter(gallery_id=gallery.gallery_id)
        return image_list





# class call_model(APIView):
#     def get(self,request):
#         if request.method == 'GET':
#             folder_path=Selfie2AnimeConfig.folder_path
#             gan=Selfie2AnimeConfig.gan
#             sess=Selfie2AnimeConfig.sess
#             checkpoint_path=Selfie2AnimeConfig.checkpoint_path
#             saver=Selfie2AnimeConfig.saver

#             response = HttpResponse(content_type="image/jpeg")
#             img_path=(folder_path+'/selfie2anime/imgs/nana.jpg')
#             detector = dlib.get_frontal_face_detector()
#             sp = dlib.shape_predictor(folder_path+'/selfie2anime/checkpoint/shape_predictor_5_face_landmarks.dat')
#             img = cv2.imread(img_path, flags=cv2.IMREAD_COLOR)
#             img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
     

#             brightness = 0
#             contrast = 30
#             img = np.int16(img)
#             img = img * (contrast / 127 + 1) - contrast + brightness
#             img = np.clip(img, 0, 255)
#             img = np.uint8(img)

#             dets = detector(img)
            
#             if len(dets) == 0:
#                 print('No faces!')
#                 result = None
#             else:
#                 # don't crop if face is too big
#                 if dets[0].width() < img.shape[1] * 0.55:
#                     s = sp(img, dets[0])
#                     img = dlib.get_face_chip(img, s, size=256, padding=0.65)

#                 # preprocessing
#                 img_input = cv2.resize(img, dsize=(256, 256), interpolation=cv2.INTER_NEAREST)
#                 img_input = np.expand_dims(img_input, axis=0)
#                 img_input = img_input / 127.5 - 1

#                 # inference
#                 img_output = Selfie2AnimeConfig.sess.run(gan.test_fake_B, feed_dict={gan.test_domain_A: img_input})

#                 # postprocessing
#                 img_output = (img_output + 1) * 127.5
#                 img_output = img_output.astype(np.uint8).squeeze()
                
#                 result = np.hstack([cv2.resize(img, (256, 256)), img_output])
#                 cv2.imwrite(folder_path+'/selfie2anime/result/%s' % os.path.basename(img_path), result[:, :, ::-1])
#                 img = Pimg.open(folder_path+"/selfie2anime/result/nana.jpg")
#                 img.save(response,'jpeg')

#             return response

        
