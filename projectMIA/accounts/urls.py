from django.urls import path
from rest_framework import routers

from .views import *

app_name = 'User'

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
]+ router.urls