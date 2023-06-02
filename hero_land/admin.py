from django.contrib import admin
from .models import HeroModel, CustomUserModel

# Register your models here.
admin.site.register(CustomUserModel)
@admin.register(HeroModel)
class HeroAdmin(admin.ModelAdmin):
    readonly_fields = ['cover_id', 'cover_url']
