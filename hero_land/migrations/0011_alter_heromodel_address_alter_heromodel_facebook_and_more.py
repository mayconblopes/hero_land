# Generated by Django 4.2.1 on 2023-06-01 13:39

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('hero_land', '0010_alter_heromodel_public_id_alter_heromodel_whatsapp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='heromodel',
            name='address',
            field=models.TextField(blank=True, default='', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='facebook',
            field=models.URLField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='instagram',
            field=models.URLField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='linkedin',
            field=models.URLField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='public_id',
            field=models.CharField(default=uuid.UUID('ec6c15f9-1d70-415b-b2a3-8d8f0a2e9329'), max_length=300),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='twitter',
            field=models.URLField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='whatsapp',
            field=models.URLField(blank=True, default='https://wa.me/55...', null=True),
        ),
    ]