# Generated by Django 5.1 on 2024-10-04 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='paid_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
