from django.shortcuts import render
from post.models import Post, Coupe, Fuel, Gearbox, NumberOfDoors
from api.utils import get_follow_logo
from search.utils import CACHED_SEARCH
from search.utils import get_page_obj


def home(request, page=1):
    CACHED_SEARCH.clear()
    doors = NumberOfDoors.objects.all()
    transmissions = Gearbox.objects.all()
    fuels = Fuel.objects.all()
    coupes = Coupe.objects.all()
    posts = Post.objects.all()
    get_follow_logo(posts, request)
    page_obj = get_page_obj(page, posts, per_page=2)

    return render(request, 'base/home_page.html', {
        'posts': posts,
        'coupes': coupes,
        'fuels': fuels,
        'transmissions': transmissions,
        'doors': doors,
        'page_obj': page_obj
    })
