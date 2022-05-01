from django.urls import path
from . import views

urlpatterns = [
    path('sign-up/', views.registration_request, name='registration'),
    path('login/', views.login_request, name='login'),
    path('log-out/', views.logout_request, name='logout'),
    path('profile/', views.my_profile, name='profile'),
    path('update-profile', views.update_profile, name='update-profile')
]