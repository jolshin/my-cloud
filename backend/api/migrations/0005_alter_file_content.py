# Generated by Django 4.2.23 on 2025-07-12 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userprofile_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='content',
            field=models.FileField(upload_to='cloud/'),
        ),
    ]
