from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.CustomUserViewSet)
router.register(r'heroes', views.HeroViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', views.login),
    path('hero/<str:public_id>', views.find_hero_by_public_id)

]
