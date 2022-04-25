from api.serializers import PostSerializer
from api.utils import get_follow_logo
from . utils import check_cache_for_coupe
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def coupe_search(request, type):
    posts = check_cache_for_coupe(type)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

    