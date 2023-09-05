from django.shortcuts import render,redirect,get_object_or_404
from .models import EmailDetail,ContactDetail,QuoteRequest,ContactFormEntry,Post,BlogPost,BlogRecent,Photo
from django.shortcuts import render
from django.core.mail import send_mail
import urllib.parse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views import View
from django.core.paginator import Paginator,EmptyPage, PageNotAnInteger


# Create your views here.
def index(request):
    if request.method=="POST":
        if request.POST.get("formhidden")=="formemail":
            email=request.POST.get('email_1')
            email_1=EmailDetail(
                Email=email
            )
            email_1.save()

        elif request.POST.get("formhidden")=="contactus":
            name=request.POST.get('C-name')
            emailC=request.POST.get('C-email')
            phone=request.POST.get('C-phone')
            service=request.POST.get('C-service')
            message=request.POST.get('C-message')

            contact_1=ContactDetail(
                Name=name,
                Email=emailC,
                Phone=phone,
                Service=service,
                Message=message
            )
            contact_1.save()

        # Redirect to WhatsApp
            phone_number = '919526396745'
            text = f"Name: {name}\nEmail: {emailC}\nPhone: {phone}\nService: {service}\nMessage: {message}"
            whatsapp_url = f"https://wa.me/{phone_number}?text={text}"
            return HttpResponseRedirect(whatsapp_url)
    
    return render(request,"web/index.html")

def aboutus(request):

    return render(request,"web/details/about-us-extend.html")

def about1(request):


    return render(request,"web/details/about-us.html")


# --------------------start blog-single-------
def blogS(request):
    if request.method == 'POST':
        name = request.POST.get('L-name')
        email = request.POST.get('L-email')
        comment = request.POST.get('L-comment')

        # Save form data to the database
        entry = ContactFormEntry(
            name=name, 
            email=email, 
            comment=comment)
        entry.save()

    

    return render(request,"web/details/blog-single.html")
     # -----------------end blog-single--------

# def blog(request):


class BlogListView(View):
    def get(self, request):
        All_results = BlogPost.objects.all()
        # related_tags = BlogPost.objects.values_list('tags', flat=True).distinct()
        result_right = BlogRecent.objects.all()
        related_tags = BlogPost.objects.all()

        # blogpagination = BlogPost.objects.all()
        result_paginator = Paginator(All_results, 5)
        result_right_paginator = Paginator(result_right, 2)
        related_tags_paginator = Paginator(related_tags, 2)



        page_number = request.GET.get('page')
        result_right_page_number = request.GET.get('page')
        related_tags_page_number = request.GET.get('page')

        
                # Get the paginated data for each set of data
        results = result_paginator.get_page(page_number)
        result_right = result_right_paginator.get_page(result_right_page_number)
        related_tags = related_tags_paginator.get_page(related_tags_page_number)

        totolpage=results.paginator.num_pages

        context ={
            'results': results,
            'resultRight' :result_right,
            'related_tags': related_tags,
            'lastpage':totolpage,
            'totalPagelist':[n+1 for n in range(totolpage)]
        }
  
        return render(request,"web/details/blog.html",context)




def contact(request):
    if request.method=="POST":
        if request.POST.get("formhidden")=="formemail":
            email=request.POST.get('email_1')
            email_1=EmailDetail(
                Email=email
            )
            email_1.save()

        elif request.POST.get("formhidden")=="contactus":
            name=request.POST.get('C-name')
            emailC=request.POST.get('C-email')
            phone=request.POST.get('C-phone')
            service=request.POST.get('C-service')
            message=request.POST.get('C-message')

            contact_1=ContactDetail(
                Name=name,
                Email=emailC,
                Phone=phone,
                Service=service,
                Message=message
            )
            contact_1.save()

        # Redirect to WhatsApp
            phone_number = '919526396745'
            text = f"Name: {name}\nEmail: {emailC}\nPhone: {phone}\nService: {service}\nMessage: {message}"
            whatsapp_url = f"https://wa.me/{phone_number}?text={text}"
            return HttpResponseRedirect(whatsapp_url)

    return render(request,"web/details/contact.html")

def error(request):
  

    return render(request,"web/details/error-404.html")

def faqs(request):
  
    return render(request,"web/details/faqs.html")

def faqsextend(request):
  
    return render(request,"web/details/faqs-extend.html")

def galleryextend(request):

    return render(request,"web/details/gallery-extend.html")

def galleryA(request):

    # gallerys = Gallery_all.objects.all()
    # context ={
    #     'gallerys':gallerys,
    # }

    photos = Photo.objects.all()
    paginator = Paginator(photos, 4)  # Show 12 photos per page

    page = request.GET.get('page')
    try:
        photos_page = paginator.page(page)
    except PageNotAnInteger:
        photos_page = paginator.page(1)
    except EmptyPage:
        photos_page = paginator.page(paginator.num_pages)


    return render(request,"web/details/gallery-photos-all.html",{'photos': photos_page} )

def galleryP(request):

    return render(request,"web/details/gallery-photos.html")

def gallery(request):

    return render(request,"web/details/gallery.html")



def quote_request(request):
    if request.method=="POST":
        if request.POST.get("formhidden")=="formemail":
            email=request.POST.get('email_1')
            email_1=EmailDetail(
                Email=email
            )
            email_1.save()

        if request.POST.get("formhidden")=="form_quote":           
            name = request.POST.get('quote-request-name')
            company = request.POST.get('quote-request-company')
            email = request.POST.get('quote-request-email')
            phone = request.POST.get('quote-request-phone')
            interests = request.POST.getlist('quote-request-interest[]')
            reach_time = request.POST.get('quote-request-reach')
            hear_about = request.POST.get('quote-request-hear')
            message = request.POST.get('quote-request-message')

            # Create a new QuoteRequest instance and save it to the database
            quote_request = QuoteRequest(
                name=name,
                company=company,
                email=email,
                phone=phone,
                interests=interests,
                reach_time=reach_time,
                hear_about=hear_about,
                message=message
            )
            quote_request.save()

    return render(request,"web/details/get-a-quote.html")

def index2(request):
    if request.method=="POST":
        if request.POST.get("formhidden")=="formemail":
            email=request.POST.get('email_1')
            email_1=EmailDetail(
                Email=email
            )
            email_1.save()

        elif request.POST.get("formhidden")=="contactus":
            name=request.POST.get('C-name')
            emailC=request.POST.get('C-email')
            phone=request.POST.get('C-phone')
            service=request.POST.get('C-service')
            message=request.POST.get('C-message')

            contact_1=ContactDetail(
                Name=name,
                Email=emailC,
                Phone=phone,
                Service=service,
                Message=message
            )
            contact_1.save()

        # Redirect to WhatsApp
            phone_number = '919526396745'
            text = f"Name: {name}\nEmail: {emailC}\nPhone: {phone}\nService: {service}\nMessage: {message}"
            whatsapp_url = f"https://wa.me/{phone_number}?text={text}"
            return HttpResponseRedirect(whatsapp_url)

    return render(request,"web/details/index-2.html")

def megamenu(request):
   
    return render(request,"web/details/megamenu.html")

def productsingle(request):
  
    return render(request,"web/details/product-single.html")

def product(request):

    return render(request,"web/details/products.html")

def projectsingle(request):
 
    return render(request,"web/details/project-single.html")

def projectextend(request):
 
    return render(request,"web/details/projects-extend.html")

def project(request):

    return render(request,"web/details/projects.html")

def serviceextend(request):

    return render(request,"web/details/service-extend.html")

def servicesingle(request):

    return render(request,"web/details/service-single.html")

def servicesingle2(request):

    return render(request,"web/details/service-single-2.html")

def service(request):

    return render(request,"web/details/service.html")

def teamsingle(request):

    return render(request,"web/details/team-single.html")

def team(request):

    return render(request,"web/details/teams.html")

def typography(request):

    return render(request,"web/details/typography.html")

# def search(request):
#     query = request.GET.get('query')
#     results = Post.objects.filter(name__icontains = query)

#     context ={
#         'results':results 
#     }
#     return render(request,"web/search.html",context)


def search(request):
    query = request.GET.get('query')
    if query:
        results = BlogPost.objects.filter(title__icontains=query) | BlogPost.objects.filter(content__icontains=query)
        resultRight = BlogRecent.objects.filter(titles__icontains=query)

    else:
        results = []
        resultRight = []
    return render(request, 'web/search.html', {'results': results, 'query': query, 'resultRight':resultRight})



# def search(request):
#     query = request.GET.get('q')
#     if query:
#         results = Blog.objects.filter(title__icontains=query)
#     else:
#         results = None
#     return render(request,'web/search.html', {'results': results})