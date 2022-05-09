from django.urls import path
from . import views


urlpatterns = [
    path('all-posts/', views.all_posts, name='all-posts'),
    path('all-posts/<page>', views.all_posts, name='all-posts'),
    path('coupe-search/<type>/', views.coupe_search, name='coupe-search'),
    path('coupe-search/<type>/<page>', views.coupe_search, name='coupe-search'),
    path('model-search/', views.model_search, name='model-search'),
    path('model-search/<page>', views.model_search, name='model-search'),
    path('fuel-search/<type>/', views.fuel_search, name='fuel-search'),
    path('fuel-search/<type>/<page>', views.fuel_search, name='fuel-search'),
    path('transmission-search/<type>/', views.transmission_search, name='transmission-search'),
    path('transmission-search/<type>/<page>', views.transmission_search, name='transmission-search'),
    path('price-limit-search/', views.price_limit_search, name='price-limit-search'),
    path('price-limit-search/<page>', views.price_limit_search, name='price-limit-search'),
    path('location-search/', views.location_search, name='location-search'),
    path('location-search/<page>', views.location_search, name='location-search'),
    path('year-search/', views.year_search, name='year-search'),
    path('year-search/<page>', views.year_search, name='year-search'),
]