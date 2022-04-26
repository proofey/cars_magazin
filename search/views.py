from api.serializers import PostSerializer
from api.utils import get_follow_logo
from . utils import check_cache_for_coupe, check_cache_for_model
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def coupe_search(request, type):
    posts = check_cache_for_coupe(type)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def model_search(request):
    model = request.POST.get('model-input')
    posts = check_cache_for_model(model)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)