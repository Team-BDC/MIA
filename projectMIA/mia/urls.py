from django.urls import path,include
from django.conf import settings 
from django.contrib import admin
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from mia import views

urlpatterns = [ 
    path("v1/test", TestView.as_view({"get": "list", "post": "add"}), name="tests"),
    path("v1/test/<int:test_num>", TestView.as_view({"get": "list"}), name="test"),
    path('model/',views.call_model.as_view())
]