from django.shortcuts import render
from . forms import PostForm



def new_post(request):
    form = PostForm()

    return render(request, 'post/new_post.html', {
        'form': form
    })
