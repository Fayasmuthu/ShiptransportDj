from django.contrib import admin
from django.urls import path
from .import views
urlpatterns = [
    path('',views.index,name="index"),
    path('aboutus',views.aboutus,name="aboutus"),
    path('about',views.about1,name="about1"),
    path('blog-single/',views.blogS,name="blog-single"),
    path('blog/',views.BlogListView.as_view(),name="blog"),
    path('contact',views.contact,name="contact"),
    path('error',views.error,name="error"),
    path('faqs',views.faqs,name="faqs"),
    path('faqsextend',views.faqsextend,name="faqsextend"),
    path('gallery-extend',views.galleryextend,name="gallery-extend"),
    path('gallery-all',views.galleryA,name="gallery-all"),
    path('gallery-all',views.galleryP,name="galleryP"),
    path('gallery',views.gallery,name="gallery"),
    path('get-a-quote',views.quote_request,name="get"),
    path('index2',views.index2,name="index2"),
    path('megamenu',views.megamenu,name="megamenu"),
    path('product-single',views.productsingle,name="product-single"),
    path('product',views.product,name="product"),
    path('project-extend',views.projectextend,name="project-extend"),
    path('project-single',views.projectsingle,name="project-single"),
    path('project',views.project,name="project"),
    path('service-extend',views.serviceextend,name="service-extend"),
    path('service-single',views.servicesingle,name="service-single"),
    path('service-single2',views.servicesingle2,name="service-single2"),
    path('service',views.service,name="service"),
    path('team-single',views.teamsingle,name="team-single"),
    path('team',views.team,name="team"),
    path('typography',views.typography,name="typography"),
    path('search/',views.search,name="search")
  
]