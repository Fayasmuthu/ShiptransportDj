from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class EmailDetail(models.Model):
    Email=models.EmailField()
    def __str__(self):
        return self.Email


class ContactDetail(models.Model):
    Name=models.CharField(max_length=50)
    Email=models.EmailField()
    Phone=models.IntegerField()
    Service=models.CharField(max_length=50)
    Message=models.CharField(max_length=150)
    def __str__(self):
        return self.Name
    
    

class QuoteRequest(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    interests = models.TextField()
    reach_time = models.CharField(max_length=20)
    hear_about = models.CharField(max_length=50)
    message = models.TextField()

def __str__(self):
        return self.name



class ContactFormEntry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    comment = models.TextField()

    def __str__(self):
        return self.name
    
class Post(models.Model):
     name =models.CharField(max_length=200)
     image =models.ImageField(upload_to='search_image/img')
     place =models.CharField(max_length=200)
     decoration =models.CharField(max_length=200)


class BlogPost(models.Model):
    image =models.ImageField(upload_to='blog_image/image')
    title = models.CharField(max_length=255)
    content = models.TextField()
    publication_date = models.DateField()
    views = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    tags = models.ManyToManyField('Tag')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    
class BlogRecent(models.Model):
    image =models.ImageField(upload_to='Blog_recent/images')
    titles = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    # Add more fields as per your requirements

class Photo(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='photos/')
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.title