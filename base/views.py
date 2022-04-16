from django.shortcuts import render
from post.models import Post


def home(request):
    posts = Post.objects.all()

    return render(request, 'base/home_page.html', {
        'posts': posts
    })
