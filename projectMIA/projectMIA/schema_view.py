from django.urls import path, include
from rest_framework.permissions import AllowAny
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

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
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,),
    patterns=schema_url_v1_patterns,
)

# flex : JSON schema를 체크하는 검사기 패키지 