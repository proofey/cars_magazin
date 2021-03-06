# Generated by Django 4.0 on 2022-04-12 17:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_post_coupe'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='condition',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='post.condition'),
        ),
        migrations.AddField(
            model_name='post',
            name='fuel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='post.fuel'),
        ),
        migrations.AddField(
            model_name='post',
            name='gearbox',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='post.gearbox'),
        ),
        migrations.AddField(
            model_name='post',
            name='number_of_doors',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='post.numberofdoors'),
        ),
    ]
