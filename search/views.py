from api.serializers import PostSerializer
from api.utils import get_follow_logo
from . utils import *
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

@api_view(['GET'])
def fuel_search(request, type):
    posts = check_cache_for_fuel(type)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def transmission_search(request, type):
    posts = check_cache_for_transmission(type)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def price_limit_search(request):
    price_limit = request.POST.get('price-limit-input')
    posts = check_cache_for_price_limit(price_limit)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def location_search(request):
    location = request.POST.get('location-input')
    posts = check_cache_for_location(location)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def year_search(request):
    year = request.POST.get('year-input')
    posts = check_cache_for_year(year)
    get_follow_logo(posts, request)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)