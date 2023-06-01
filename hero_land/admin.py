from django.contrib import admin
from .models import HeroModel, CustomUserModel

# Register your models here.
admin.site.register(HeroModel)
admin.site.register(CustomUserModel)
