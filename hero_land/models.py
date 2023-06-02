import shutil
import uuid

from django.db import models
from django.contrib.auth.models import User
from markdownfield.models import MarkdownField, RenderedMarkdownField
from imagekitio import ImageKit


# Method to save files on imagekitio
def imagekitio_save(super, file_field, file_name, cover_url, cover_id, *args, **kwargs):
    """overrides the instance.save method, uploading media file to imagekitio and retreaving it's URL"""

    imagekit = ImageKit(

        #TODO (env)
        private_key='TODO',

        #TODO (env)
        public_key='TODO',

        #TODO (env)
        url_endpoint='TODO'

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


# update the database saving the files's URL
# super.save(*args, **kwargs)

# delete temp media folder on WebServer
# try/except to ignore errors in case of saving the model without uploading new image
    try:
        shutil.rmtree('media')
    except FileNotFoundError:
        pass

    return cover_url, cover_id

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
    cover = models.ImageField(upload_to='hero-covers', default='')
    cover_url = models.URLField(blank=True, null=True)
    cover_id = models.CharField(blank=True, null=True, default='', max_length=50)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.cover_url, self.cover_id = imagekitio_save(super=super(), file_field=self.cover, file_name=self.name,
                                                        cover_url=self.cover_url, cover_id=self.cover_id)
        super().save()
