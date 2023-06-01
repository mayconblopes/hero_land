from rest_framework import serializers
from .models import HeroModel, CustomUserModel


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ['id', 'username', 'hero']


class HeroModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroModel
        # fields = ['id', 'name', 'skills', 'bio', 'public_id', ]
        fields = '__all__'

