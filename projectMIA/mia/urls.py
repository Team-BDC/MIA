from django.urls import path,include
from django.conf import settings 
from .views import *

urlpatterns = [ 
    path("v1/test", TestView.as_view({"get": "list", "post": "add"}), name="tests"),
    path("v1/test/<int:test_num>", TestView.as_view({"get": "list"}), name="test"),
]