from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)
router.register(r'themes', views.ThemeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', views.login),
    path('hero/<str:public_id>', views.find_hero_by_public_id)

]
