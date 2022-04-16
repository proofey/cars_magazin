from django.shortcuts import render, redirect
from . forms import PostForm



def new_post(request):
    form = PostForm()
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user.profile
            post.save()
            form.save_m2m()

            return redirect('profile')

    return render(request, 'post/new_post.html', {
        'form': form
    })
