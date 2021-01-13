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



