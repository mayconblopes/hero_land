from django.contrib import admin
from .models import HeroModel

# Register your models here.
@admin.register(HeroModel)
class HeroAdmin(admin.ModelAdmin):
    readonly_fields = ['cover_id', 'cover_url']
