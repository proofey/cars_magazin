from django.urls import path
from . import views

urlpatterns = [
     path('my-posts', views.my_posts, name='my-posts'),
     path('my-follows', views.posts_i_follow, name='my-follows')
]