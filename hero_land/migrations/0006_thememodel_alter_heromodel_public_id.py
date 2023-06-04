# Generated by Django 4.2.1 on 2023-06-03 17:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('hero_land', '0005_alter_heromodel_cover_alter_heromodel_public_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='ThemeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('cover_bgcolor', models.CharField(default='#F96699', max_length=20)),
                ('about_bgcolor', models.CharField(default='#38CCCC', max_length=20)),
                ('contact_bgcolor', models.CharField(default='#99CCCC', max_length=20)),
                ('page_bgcolor', models.CharField(default='#000000', max_length=20)),
            ],
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='public_id',
            field=models.CharField(default=uuid.UUID('72e53dc9-d979-40b7-ba99-7cac264c8f35'), max_length=300),
        ),
    ]
