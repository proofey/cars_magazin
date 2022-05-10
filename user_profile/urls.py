from django.urls import path
from . import views

urlpatterns = [
    path('sign-up/', views.registration_request, name='registration'),
    path('login/', views.login_request, name='login'),
    path('log-out/', views.logout_request, name='logout'),
    path('profile/', views.my_profile, name='profile'),
    path('update-profile/', views.update_profile, name='update-profile'),
    path('my-posts/', views.my_posts, name='my-posts'),
    path('my-posts/<page>', views.my_posts, name='my-posts'),
    path('my-follows/', views.posts_i_follow, name='my-follows'),
    path('my-follows/<page>', views.posts_i_follow, name='my-follows'),
]