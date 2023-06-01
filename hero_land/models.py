import uuid

from django.db import models
from django.contrib.auth.models import User
from markdownfield.models import MarkdownField, RenderedMarkdownField


# Create your models here.

class CustomUserModel(User):
    objects = models.Manager()
    hero = models.ForeignKey("HeroModel", on_delete=models.CASCADE)


class HeroModel(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=150, blank=False, null=False)
    public_id = models.CharField(max_length=300, default=uuid.uuid4())
    skills = models.CharField(max_length=1000)
    bio = models.TextField(max_length=5000)
    instagram = models.URLField(default='', blank=True, null=True)
    twitter = models.URLField(default='', blank=True, null=True)
    linkedin = models.URLField(default='', blank=True, null=True)
    facebook = models.URLField(default='', blank=True, null=True)
    phone = models.CharField(max_length=30, default='')
    address = models.TextField(max_length=500, default='', blank=True, null=True)
    whatsapp = models.URLField(default='https://wa.me/55...', blank=True, null=True)

    def __str__(self):
        return self.name
