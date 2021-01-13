from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

# 리액트 연동 테스트용 뷰. viewset을 이용, get, post, put, delete 가능
class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

