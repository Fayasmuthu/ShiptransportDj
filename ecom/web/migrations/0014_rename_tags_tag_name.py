# Generated by Django 4.2 on 2023-07-11 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0013_rename_tag_tag_tags'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='tags',
            new_name='name',
        ),
    ]