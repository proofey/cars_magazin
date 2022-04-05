from django.shortcuts import render, redirect

from user_profile.models import Profile
from . forms import RegistrationForm, LoginForm
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse



def my_profile(request):
    profile = Profile.objects.get(user=request.user)


    return render(request, 'user_profile/profile.html', {
        'profile': profile
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

