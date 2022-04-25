from django.shortcuts import render
from post.models import Post, Coupe, Fuel, Gearbox, NumberOfDoors
from api.utils import get_follow_logo
from search.utils import CACHED_SEARCH


def home(request):
    CACHED_SEARCH.clear()
    doors = NumberOfDoors.objects.all()
    transmissions = Gearbox.objects.all()
    fuels = Fuel.objects.all()
    coupes = Coupe.objects.all()
    posts = Post.objects.all()
    get_follow_logo(posts, request)

    return render(request, 'base/home_page.html', {
        'posts': posts,
        'coupes': coupes,
        'fuels': fuels,
        'transmissions': transmissions,
        'doors': doors
    })
