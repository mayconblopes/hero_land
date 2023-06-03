from rest_framework import serializers
from .models import HeroModel


class HeroModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroModel
        # fields = ['id', 'name', 'skills', 'bio', 'public_id', ]
        fields = '__all__'

