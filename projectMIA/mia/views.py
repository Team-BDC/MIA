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
from .apps import Selfie2AnimeConfig
#import PIL
from PIL import Image as Pimg
from django.http import Http404
from drf_yasg.inspectors.base import openapi
from drf_yasg.utils import swagger_auto_schema, no_body
from .serializers import *
from django.contrib.auth.models import User
from .models import *
from django.views import View 
import urllib
import json


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


# class ImagerViewSet(viewsets.ModelViewSet):
#     authentication_classes = ()
#     permission_classes = ()
#     serializer_class = ImageSerializer

#     def get_queryset(self):
#         gallery = self.kwargs['gallery_id']
#         queryset = Image.objects.filter(gallery=gallery)
#         return queryset


#     def perform_create(self, serializer):
#         serializer.save()



class GalleryViewSet(viewsets.ModelViewSet):
    serializer_class = GallerySerializer

    def get_queryset(self):
        return Gallery.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class ImageViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    # serializer_class = GallerySerializer
    serializer_class = ImageSerializer

    def get_queryset(self):
        user = self.kwargs['user_name']
        userset = User.objects.get(username=user)
        user_id = userset.id
        # 여기까지 harry 유저 객체 id 가져옴
        gallery = Gallery.objects.get(user=user_id)
        gallery_id = gallery.gallery_id
        # 여기까지 user객체의 id를 fk를 갖는 gallery 가져옴
        images = Image.objects.filter(gallery=gallery_id)
        # 여기까지 gallery_id를 fk로 갖는 이미지 쿼리셋 가져옴
        return images






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


        
class call_model(APIView):

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            folder_path=Selfie2AnimeConfig.folder_path
            gan=Selfie2AnimeConfig.gan
            sess=Selfie2AnimeConfig.sess
            checkpoint_path=Selfie2AnimeConfig.checkpoint_path
            saver=Selfie2AnimeConfig.saver

            response = HttpResponse(content_type="image/jpeg")
            
            detector = dlib.get_frontal_face_detector()
            sp = dlib.shape_predictor(folder_path+'/selfie2anime/checkpoint/shape_predictor_5_face_landmarks.dat')

            data = json.loads(request.body)
            img_name = data['img_name']
            img_url = data['profile_url']

            
            #이미지 url -> 리액트에 띄운 사진 링크 복사 한 거,,되는거 확인했구 json으로 받아올 것입니다 ,,~~            
            
            resp = urllib.request.urlopen(img_url)
            img = np.asarray(bytearray(resp.read()), dtype="uint8")
            img = cv2.imdecode(img, cv2.IMREAD_COLOR)
           
        #    img = url_to_image(url)

         #   img = cv2.imread(img_path, flags=cv2.IMREAD_COLOR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
     

            brightness = 0
            contrast = 30
            img = np.int16(img)
            img = img * (contrast / 127 + 1) - contrast + brightness
            img = np.clip(img, 0, 255)
            img = np.uint8(img)

            dets = detector(img)
            
            if len(dets) == 0:
                print('No faces!')
                result = None
            else:
                # don't crop if face is too big
                if dets[0].width() < img.shape[1] * 0.55:
                    s = sp(img, dets[0])
                    img = dlib.get_face_chip(img, s, size=256, padding=0.65)

                # preprocessing
                img_input = cv2.resize(img, dsize=(256, 256), interpolation=cv2.INTER_NEAREST)
                img_input = np.expand_dims(img_input, axis=0)
                img_input = img_input / 127.5 - 1

                # inference
                img_output = Selfie2AnimeConfig.sess.run(gan.test_fake_B, feed_dict={gan.test_domain_A: img_input})

                # postprocessing
                img_output = (img_output + 1) * 127.5
                img_output = img_output.astype(np.uint8).squeeze()
                
                result = np.hstack([cv2.resize(img, (256, 256)), img_output])
             #   cv2.imwrite(folder_path+'/selfie2anime/result/%s' % os.path.basename(img_path), result[:, :, ::-1])
                cv2.imwrite(folder_path+'/selfie2anime/result/'+ img_name, result[:, :, ::-1])
                img = Pimg.open(folder_path+"/selfie2anime/result/"+img_name)
                img.save(response,'jpeg')

            return response