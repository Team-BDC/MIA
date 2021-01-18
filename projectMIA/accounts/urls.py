from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet

app_name = 'User'

router = routers.DefaultRouter()
router.register(r'', UserViewSet)


urlpatterns = [
] + router.urls