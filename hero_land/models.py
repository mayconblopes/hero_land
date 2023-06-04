import shutil
import uuid

from django.db import models
from django.contrib.auth.models import User
from imagekitio import ImageKit
from decouple import config

PRIVATEKEY = config("PRIVATEKEY")
PUBLICKEY = config("PUBLICKEY")
ENDPOINT = config("ENDPOINT")


# Method to save files on imagekitio
def imagekitio_save(super, file_field, file_name, cover_url, cover_id, *args, **kwargs):
    """overrides the instance.save method, uploading media file to imagekitio and retreaving it's URL"""

    imagekit = ImageKit(
        private_key=PRIVATEKEY,
        public_key=PUBLICKEY,
        url_endpoint=ENDPOINT,
    )

    # update the database saving file to temp media folder on WebServer (will be deleted soon...)
    super.save(*args, **kwargs)

    # try/except to ignore errors in case of saving the model without uploading new image
    try:
        result = imagekit.upload_file(file=open(file_field.path, "rb"), file_name=file_name)
        print('uploading image to imagekitio', result)
        # if old cover exists on imagekitio, delete it before uploading a new cover
        if cover_id:
            print('old cover exists... preparing to delete it')
            print(imagekit.delete_file(file_id=cover_id))

        # get url and id of the new cover file
        cover_url = result['response']['url']
        cover_id = result['response']['fileId']
    except FileNotFoundError:
        cover_url = cover_url
        cover_id = cover_id
        print('Valid cover not uploaded', FileNotFoundError)

    except ValueError:
        print('Valid cover not uploaded', ValueError)

    # delete temp media folder on WebServer
    # try/except to ignore errors in case of saving the model without uploading new image
    try:
        shutil.rmtree('media')
    except FileNotFoundError:
        pass

    return cover_url, cover_id


class HeroModel(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=150, blank=False, null=False)
    public_id = models.CharField(max_length=300, default=uuid.uuid4())
    username = models.CharField(max_length=30, unique=True)
    skills = models.CharField(max_length=1000)
    bio = models.TextField(max_length=5000)
    instagram = models.URLField(default='', blank=True, null=True)
    twitter = models.URLField(default='', blank=True, null=True)
    linkedin = models.URLField(default='', blank=True, null=True)
    facebook = models.URLField(default='', blank=True, null=True)
    phone = models.CharField(max_length=30, default='')
    address = models.TextField(max_length=500, default='', blank=True, null=True)
    whatsapp = models.URLField(default='https://api.whatsapp.com/send/?phone=55...', blank=True, null=True)
    cover = models.ImageField(upload_to='hero-covers', default='', blank=True, null=True)
    cover_url = models.URLField(blank=True, null=True)
    cover_id = models.CharField(blank=True, null=True, default='', max_length=50)
    theme = models.ForeignKey('ThemeModel', on_delete=models.CASCADE, default='1')

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        self.cover_url, self.cover_id = imagekitio_save(super=super(), file_field=self.cover, file_name=self.name,
                                                        cover_url=self.cover_url, cover_id=self.cover_id)
        if self.theme.name == 'default':
            self.theme = ThemeModel.objects.create(name=self.username)
        super().save()


class ThemeModel(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=50, unique=True)
    cover_bgcolor = models.CharField(max_length=20, default='#F96699')
    about_bgcolor = models.CharField(max_length=20, default='#38CCCC')
    contact_bgcolor = models.CharField(max_length=20, default='#99CCCC')
    page_bgcolor = models.CharField(max_length=20, default='#000000')
    font_color = models.CharField(max_length=20, default='#000000')


    def __str__(self):
        return self.name
