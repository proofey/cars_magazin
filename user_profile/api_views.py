from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from post.serializers import PostSerializer
from django.views.decorators.csrf import csrf_exempt
from post.models import Post
from django.http import JsonResponse

@api_view(["GET"])
def my_posts(request):
    if request.method == "GET":
        posts = Post.objects.filter(author=request.user.profile).order_by('-id')
        serializer = PostSerializer(posts, many=True)   
        return Response(serializer.data)