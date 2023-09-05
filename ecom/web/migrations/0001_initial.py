# Generated by Django 4.2 on 2023-07-06 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Email', models.EmailField(max_length=254)),
                ('Phone', models.IntegerField()),
                ('Service', models.CharField(max_length=50)),
                ('Messenger', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='EmailDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='QuoteRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('company', models.CharField(blank=True, max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('interests', models.CharField(max_length=200)),
                ('best_time_to_reach', models.CharField(max_length=50)),
                ('hear_about_us', models.CharField(max_length=100)),
                ('message', models.TextField()),
            ],
        ),
    ]
