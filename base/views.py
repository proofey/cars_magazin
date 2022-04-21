from django.shortcuts import render
from post.models import Post
from user_profile.models import Profile


def home(request):
    posts = Post.objects.all()
    profile = Profile.objects.get(user=request.user)

    return render(request, 'base/home_page.html', {
        'posts': posts,
        'profile': profile
    })
