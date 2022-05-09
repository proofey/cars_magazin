from post.models import Post
from django.core.paginator import Paginator



CACHED_SEARCH = []


def check_cache_for_coupe(type):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if post.coupe.type != type:
                new_list.append(post)
    else:
        posts = Post.objects.filter(coupe__type=type)
        for post in posts:        
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)

    return CACHED_SEARCH


def check_cache_for_model(model):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if model.lower() not in post.model.lower():
                new_list.append(post)
    else:
        posts = Post.objects.filter(model__icontains=model)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH


def check_cache_for_fuel(type):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if post.fuel.type != type:
                new_list.append(post)
    else:
        posts = Post.objects.filter(fuel__type=type)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH


def check_cache_for_transmission(type):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if post.gearbox.type != type:
                new_list.append(post)
    else:
        posts = Post.objects.filter(gearbox__type=type)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH


def check_cache_for_price_limit(price_limit):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if int(price_limit) < post.price:
                new_list.append(post)
    else:
        posts = Post.objects.filter(price__lt=price_limit)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH


def check_cache_for_location(location):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if location.lower() not in post.located_at.lower():
                new_list.append(post)
    else:
        posts = Post.objects.filter(located_at__icontains=location)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH
    

def check_cache_for_year(year):
    new_list = []
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if int(year) > post.year_made:
                new_list.append(post)
    else:
        posts = Post.objects.filter(year_made__gt=year)
        for post in posts:
            CACHED_SEARCH.append(post)

    for post in new_list:
        CACHED_SEARCH.remove(post)
    
    return CACHED_SEARCH

    
def get_page_obj(page, posts, per_page):
    paginated_posts = Paginator(posts, per_page=per_page)
    page_obj = paginated_posts.get_page(page)
    return page_obj

def check_previous(page_obj):
    if page_obj.number >= 2:
        return page_obj.previous_page_number()
    else:
        return "No previous page"

def check_next(page_obj):
    if page_obj.number == page_obj.paginator.num_pages:
        return "No next page"
    else:
        return page_obj.next_page_number()


def get_context(serializer, page_obj):
    context = {
        'posts': serializer.data,
        'num_pages': page_obj.paginator.num_pages,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'next_page_number': check_next(page_obj),
        'previous_page_number': check_previous(page_obj),
        'number': page_obj.number
    }
    return context