from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import permissions, status, mixins, viewsets

from .serializers import *
from .models import *

User = get_user_model()

class IsSuperOrAuthorOrReadonly(permissions.BasePermission):
    # 커스텀 permission : 포스트 작성자는 수정, superuser는 삭제 가능
    def has_object_permission(self, request, view, obj):
        # 인증된 유저는 목록 조회 / 포스팅 등록 가능 
        def has_permission(self, request, view):
            return request.user.is_authenticated
        
        # 작성자는 수정 허용
        def has_object_permission(self, request, views, obj):
            # 조회는 True
            if request.method in permissions.SAFE_METHODS:
                return True
            # superuer는 삭제 허용
            if (request.method == 'DELETE'):
                return request.user.is_superuser
            # PUT, DELETE는 작성자
            return obj.author == request.user
            

# Custom ViewSet - create, list, retrive, update, destroy from GenericViewSet
class UserViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes = (IsSuperOrAuthorOrReadonly,)


