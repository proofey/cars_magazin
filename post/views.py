from django.shortcuts import render, redirect
from . forms import PostForm
from . models import Post
from rest_framework.response import Response
from rest_framework import status
from . serializers import PostSerializer
from django.views.decorators.csrf import csrf_exempt




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



#--------------------- API Views ---------------------

@csrf_exempt
def post_list_api(request):
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def post_details_api(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        serializer = PostSerializer(post)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
