from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response 
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



