# Generated by Django 4.0 on 2022-04-17 11:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0008_alter_post_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='extra',
            name='type_extra',
        ),
    ]