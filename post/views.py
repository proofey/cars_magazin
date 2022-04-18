from django.shortcuts import render, redirect
from . forms import PostForm
from . models import Post



def new_post(request):
    form = PostForm()

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.author = request.user.profile
            new_form.save()
            form.save_m2m()

            return redirect('profile')

    return render(request, 'post/new_post.html', {
        'form': form
    })

def update_post(request, id):
    post = Post.objects.get(pk=id)
    form = PostForm(instance=post)

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.author = request.user.profile
            new_form.save()
            form.save_m2m()
            return redirect('profile')

    return render(request, 'post/update_post.html', {
        'form': form,
        'post': post
    })


def post_details(request, id):
    post = Post.objects.get(pk=id)

    return render(request, 'post/post_details.html', {
        'post': post
    })


def delete_post(request, id):
    post = Post.objects.get(pk=id)

    if request.user.profile == post.author:
        post.delete()
        return redirect('home-page')