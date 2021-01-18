"""projectMIA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi 
from mia import views

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from .schema_view import schema_view_v1


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # app url
    path('api/v1/user/', include('accounts.urls')),
    path('api/v1/mia/', include('mia.urls')),

    # jwt 인증
    path('jwt/token/', obtain_jwt_token),  # POST :JWT 토큰 발행
    path('jwt/token/verify/', verify_jwt_token),  # GET : JWT 유효성 검증
    path('jwt/token/refresh/', refresh_jwt_token),  # POST : JWT 토큰 갱신 
]

# 디버그 상태일때만 swagger 접근 
if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view_v1.without_ui(cache_timeout=0), name='schema-json'),
        re_path(r'^swagger/$', schema_view_v1.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view_v1.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

