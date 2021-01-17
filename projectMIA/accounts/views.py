from django.shortcuts import render
from django.http import HttpResponseRedirect
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework import permissions, status, mixins, viewsets
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.views import APIView
from .serializers import *

# from google.oauth2 import id_token
# from google.auth.transport import requests

User = get_user_model()


class IsLoggedInAsUserOrSuperUser(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an account to view and edit the user information.
    Also allows superuser to view and edit them.
    """
    message = 'You must be logged in as the user to access.'

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `owner` or `user`.
        is_superuser = request.user.is_superuser
        if is_superuser:
            return True

        elif request.method in permissions.SAFE_METHODS:
            is_logged_in_as_user = obj.id == request.user.id
            return is_logged_in_as_user
        return False


class UserViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes = (IsLoggedInAsUserOrSuperUser, )
