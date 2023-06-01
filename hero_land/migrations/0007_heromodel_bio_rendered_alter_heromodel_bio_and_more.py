# Generated by Django 4.2.1 on 2023-06-01 12:31

from django.db import migrations, models
import markdownfield.models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('hero_land', '0006_alter_heromodel_bio_alter_heromodel_public_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='heromodel',
            name='bio_rendered',
            field=markdownfield.models.RenderedMarkdownField(default='a'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='bio',
            field=markdownfield.models.MarkdownField(rendered_field='bio_rendered'),
        ),
        migrations.AlterField(
            model_name='heromodel',
            name='public_id',
            field=models.CharField(default=uuid.UUID('a686b407-14b7-4229-ac90-cee71cbf4891'), max_length=300),
        ),
    ]
