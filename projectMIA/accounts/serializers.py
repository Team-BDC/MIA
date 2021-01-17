from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User

# settings 설정에 따라, mia.models.User를 가져온다 
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(required=True)
    user_name = serializers.CharField(required=True)
    user_email = serializers.EmailField(required=True)

    def validate(self, data):
        if 'user_id' not in data:
            raise serializers.ValidationError('아이디를 입력하세요.')
        return data

    class Meta:
        model = User
        fields = ('user_id', 'user_name', 'password', 'user_email')

    def create(self, validated_data):
        user = User(
            user_id=validated_data.get('user_id'),
            user_name=validated_data.get('user_name'),
            user_email=validated_data.get('user_email'),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.user_id = validated_data.get('user_id')
        instance.user_name = validated_data.get('user_name')
        instance.user_email = validated_data.get('user_email')

        instance.save()
        return instance

