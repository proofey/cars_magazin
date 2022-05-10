from api.serializers import PostSerializer
from . utils import *
from post.utils import get_follow_logo
from django.views.decorators.http import require_http_methods
from django.http.response import JsonResponse



@require_http_methods(['GET'])
def coupe_search(request, type, page=1):
    posts = check_cache_for_coupe(type)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['POST'])
def model_search(request, page=1):
    model = request.POST.get('model-input')
    posts = check_cache_for_model(model)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=1)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['GET'])
def fuel_search(request, type, page=1):
    posts = check_cache_for_fuel(type)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['GET'])
def transmission_search(request, type, page=1):
    posts = check_cache_for_transmission(type)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['POST'])
def price_limit_search(request, page=1):
    price_limit = request.POST.get('price-limit-input')
    posts = check_cache_for_price_limit(price_limit)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=1)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['POST'])
def location_search(request, page=1):
    location = request.POST.get('location-input')
    posts = check_cache_for_location(location)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=1)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['POST'])
def year_search(request, page=1):
    year = request.POST.get('year-input')
    posts = check_cache_for_year(year)
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=1)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)

@require_http_methods(['GET'])
def all_posts(request, page=1):
    CACHED_SEARCH.clear()
    posts = Post.objects.all()
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)
    serializer = PostSerializer(page_obj.object_list, many=True)
    context = get_context(serializer, page_obj)
    return JsonResponse(context)
