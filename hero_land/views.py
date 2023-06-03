import json
from django.contrib.auth import authenticate
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer

from hero_land.models import HeroModel
from hero_land.serializers import HeroModelSerializer
from django.views.decorators.csrf import csrf_exempt


class HeroViewSet(viewsets.ModelViewSet):
    queryset = HeroModel.objects.all()
    serializer_class = HeroModelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@csrf_exempt
def find_hero_by_public_id(request, public_id):
    print(public_id)
    # hero = HeroModel.objects.filter(public_id=public_id).first()
    hero = HeroModel.objects.get(public_id=public_id)
    hero = HeroModelSerializer(hero) if hero else None
    response = JSONRenderer().render(hero.data) if hero else HttpResponse(status=404)
    return HttpResponse(response, status=200) if hero else HttpResponse(response, status=404)

@csrf_exempt
def login(request):
    sent_user = json.loads(request.body)
    user = authenticate(username=sent_user['username'], password=sent_user['password'])
    # user = f'{{"username": "{user}"}}' if user else f'{{"username": "invalid"}}'
    # return HttpResponse(str(user))
    token = Token.objects.filter(user=user).first()
    response = JsonResponse({"username": str(user), "token": str(token)}) if user else JsonResponse({"error": "Invalid username or password"})
    return response
