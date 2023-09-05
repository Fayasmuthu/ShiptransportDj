# Generated by Django 4.2 on 2023-07-07 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('publication_date', models.DateField()),
                ('views', models.IntegerField(default=0)),
                ('comments', models.IntegerField(default=0)),
                ('tags', models.CharField(max_length=255)),
            ],
        ),
    ]