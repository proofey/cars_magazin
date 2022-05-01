from django.shortcuts import render, redirect
from post.models import Post
from . models import Profile
from . forms import RegistrationForm, LoginForm, UpdateProfileForm
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse
from api.utils import get_follow_logo




def my_profile(request):
    profile = Profile.objects.get(user=request.user)
    posts = Post.objects.filter(author=request.user.profile).order_by('-id')
    get_follow_logo(posts, request)

    return render(request, 'user_profile/profile.html', {
        'profile': profile,
        'posts': posts
    })


def registration_request(request):
    form = RegistrationForm()

    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse('SUCCESS')
    
    return render(request, 'user_profile/registration.html', {
        'form': form
    })


def login_request(request):
    form = LoginForm()

    if request.method == "POST":
        form = LoginForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponse("GOOD")

    return render(request, 'user_profile/login.html', {
        'form': form
    })


def logout_request(request):
    logout(request)
    return redirect('home-page')

def update_profile(request):
    profile = Profile.objects.get(user=request.user)
    if request.method == "POST":
        form = UpdateProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return HttpResponse('Updated')
    form = UpdateProfileForm(instance=profile)
    return render(request, 'user_profile/update_profile.html', {
        'form': form
    })
