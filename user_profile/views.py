from django.shortcuts import render, redirect
from post.models import Post
from . models import Profile
from . forms import RegistrationForm, LoginForm, UpdateProfileForm
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse, JsonResponse
from post.utils import get_follow_logo
from django.contrib.auth.decorators import login_required
from . utils import anonymous_required, filter_posts_i_follow
from api.serializers import PostSerializer
from django.views.decorators.http import require_http_methods
from search.utils import get_context, get_page_obj



@login_required
def my_profile(request, page=1):
    profile = Profile.objects.get(user=request.user)
    posts = Post.objects.filter(author=request.user.profile).order_by('-id')
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)

    return render(request, 'user_profile/profile.html', {
        'profile': profile,
        'posts': posts,
        'page_obj': page_obj
    })

@anonymous_required
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

@anonymous_required
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

@login_required
def logout_request(request):
    logout(request)
    return redirect('home-page')

@login_required
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


@require_http_methods(['GET'])
@login_required
def my_posts(request, page=1):
    posts = Post.objects.filter(author=request.user.profile)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)


@require_http_methods(['GET'])
@login_required
def posts_i_follow(request, page=1):
    posts = filter_posts_i_follow(request, posts=Post.objects.all())
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)