# Generated by Django 4.2.4 on 2023-08-04 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_users_liked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='liked',
            field=models.CharField(max_length=256),
        ),
    ]
