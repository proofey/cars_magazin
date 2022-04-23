from django.shortcuts import render
from post.models import Post
from api.utils import get_follow_logo


def home(request):
    posts = Post.objects.all()
    get_follow_logo(posts, request)

    return render(request, 'base/home_page.html', {
        'posts': posts,
    })
