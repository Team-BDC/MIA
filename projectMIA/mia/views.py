from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, mixins
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
from .models import *
from django.views import View 


# 리액트 연동 테스트용 뷰. viewset을 이용, get, post, put, delete 가능
class TestView(viewsets.GenericViewSet, mixins.ListModelMixin, View):
    serializer_class = TestSerializer
    
    @swagger_auto_schema(query_serializer=TestSerializer)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def get_queryset(self):
        conditions = {
            'text': self.kwargs.get("text", None),
        }
        conditions = {key: val for key, val in conditions.items() if val is not None}

        tests = Test.objects.filter(**conditions)
        if not tests.exists():
            raise Http404

        return tests

    def add(self, request): 
        tests = Test.objects.filter(**request.data)
        if tests.exists():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        test_serializer = TestSerializer(data=request.data, partial=True)
        if not test_serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        test = testt_serializer.save()

        return Response(TestSerializer(test).data, status=status.HTTP_201_CREATED)




class call_model(APIView):
    def get(self,request):
        if request.method == 'GET':
            folder_path=Selfie2AnimeConfig.folder_path
            gan=Selfie2AnimeConfig.gan
            sess=Selfie2AnimeConfig.sess
            checkpoint_path=Selfie2AnimeConfig.checkpoint_path
            saver=Selfie2AnimeConfig.saver

            response = HttpResponse(content_type="image/jpeg")
            img_path=(folder_path+'/selfie2anime/imgs/nana.jpg')
            detector = dlib.get_frontal_face_detector()
            sp = dlib.shape_predictor(folder_path+'/selfie2anime/checkpoint/shape_predictor_5_face_landmarks.dat')
            img = cv2.imread(img_path, flags=cv2.IMREAD_COLOR)
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
                cv2.imwrite(folder_path+'/selfie2anime/result/%s' % os.path.basename(img_path), result[:, :, ::-1])
                img = Pimg.open(folder_path+"/selfie2anime/result/nana.jpg")
                img.save(response,'jpeg')

            return response

        
