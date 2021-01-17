from django.conf.urls import url
from django.urls import path, include
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from drf_yasg import openapi


schema_url_v1_patterns = [
    path('api/v1/user/', include('accounts.urls')),
    path('api/v1/mia/', include('mia.urls')),
]

schema_view_v1 = get_schema_view(
    openapi.Info(title="MIA API", 
                default_version='v1', 
                description="Project MIA를 위한 API 문서",
                terms_of_service="https://www.google.com/policies/terms/",
                contact=openapi.Contact(email="eunji980310@gmail.com"),
                license=openapi.License(name="BSD License"),),
    public=True,
    permission_classes=(permissions.AllowAny,),
    patterns=schema_url_v1_patterns,
)
