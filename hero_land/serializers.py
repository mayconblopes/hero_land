from rest_framework import serializers
from .models import HeroModel, ThemeModel


class HeroModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroModel
        # fields = ['id', 'name', 'skills', 'bio', 'public_id', ]
        fields = '__all__'

class ThemeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeModel
        fields = '__all__'