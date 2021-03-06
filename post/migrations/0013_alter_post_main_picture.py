# Generated by Django 4.0 on 2022-04-18 19:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0012_alter_post_main_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='main_picture',
            field=models.ImageField(blank=True, default='post_pictures/default_car.jpg', null=True, upload_to='post_pictures', validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])], verbose_name='Main picture'),
        ),
    ]
