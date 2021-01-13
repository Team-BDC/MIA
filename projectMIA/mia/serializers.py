# Djago REST framework를 import하여
# serializer를 통해 본인이 만들었던 모델의 모든 필드에 대해 serializer하는 MiaSerializer을 생성한다 
# serializer : 파이썬을 웹 브라우저가 이해할 수 있는 json 형식으로 바꿔주는 친구입니다.

from rest_framework import serializers
from .models import *


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'