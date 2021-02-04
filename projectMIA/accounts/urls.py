from django.urls import path, include
from rest_framework import routers
from .views import LoginAPI, UserAPI, RegistrationAPI


urlpatterns = [
    path("register/", RegistrationAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
] 