from django.urls import path
from . import views
from api import views as API

urlpatterns = [
    path('sign-up/', views.registration_request, name='registration'),
    path('login/', views.login_request, name='login'),
    path('log-out/', views.logout_request, name='logout'),
    path('profile/', views.my_profile, name='profile'),
    path('my-posts', API.my_posts, name='my-posts')
]