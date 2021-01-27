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
import base64

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
        images = Afterimage.objects.filter(gallery=gallery_id)
        # 여기까지 gallery_id를 fk로 갖는 이미지 쿼리셋 가져옴
        print(images)
        print(images.count())
        return images


class Image(APIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs): 
        if request.method == 'POST':
            folder_path=Selfie2AnimeConfig.folder_path
            data = json.loads(request.body)
            img_name = data['img_name']
            img_url = data['profile_url']
            # print(data)

            user = self.kwargs['user_name']
            userset = User.objects.get(username=user)
            user_id = userset.id
            gallery_id=Gallery.objects.get(user=user_id)
            # print(gallery_id)

            images = Afterimage.objects.create(gallery=Gallery.objects.get(user=user_id), image_name=img_name, image_path=img_url)
            with open(folder_path+"/selfie2anime/result/"+img_name,"rb") as img_file:
                img_base64=base64.b64encode(img_file.read())
            response=Response(img_base64)
            return response


        


        
class call_model(APIView):

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            folder_path=Selfie2AnimeConfig.folder_path
            gan=Selfie2AnimeConfig.gan
            sess=Selfie2AnimeConfig.sess
            checkpoint_path=Selfie2AnimeConfig.checkpoint_path
            saver=Selfie2AnimeConfig.saver

            #response = HttpResponse(content_type="image/jpeg")
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
                #img = Pimg.open(folder_path+"/selfie2anime/result/"+img_name)
                #img.save(response,'jpeg') img는  Http Response할 때 사용하면 됨. response=HttpResponse(content_type="image/jpeg") 주석도 풀어줘야 함!
                with open(folder_path+"/selfie2anime/result/"+img_name,"rb") as img_file:
                    img_base64=base64.b64encode(img_file.read())
                response=Response(img_base64)
                # 결과 이미지 httpResponse로 넘겨주지 말고 base64로 변환해서 전달. 이래야 창 띄우기 말고 다운로드가 가능
            return response