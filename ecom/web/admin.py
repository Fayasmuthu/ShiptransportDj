from django.contrib import admin
from .models import EmailDetail,ContactDetail,QuoteRequest,ContactFormEntry,BlogPost,BlogRecent,Tag,Photo


admin.site.register(EmailDetail)



    
@admin.register(ContactDetail)
class ContactDetailsAdmin(admin.ModelAdmin):
    list_display=('Name','Email','Phone','Service')

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display=('name','email','hear_about','message')
    list_filter = ('name', 'email')
    search_fields = ('name', 'email', 'hear_about')
    


@admin.register(ContactFormEntry)
class ContactFormEntryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'comment')
    list_filter = ('name', 'email')
    search_fields = ('name', 'email', 'comment')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'publication_date', 'views', 'comments')
    list_filter = ('publication_date', )
    search_fields = ('title', 'content')

@admin.register(BlogRecent)
class BlogRecentAdmin(admin.ModelAdmin):
    list_display = ('titles','content','published_date')
    list_filter = ('titles','published_date')
    search_fields = ('titles', 'published_date')

admin.site.register(Tag)

admin.site.register(Photo)
