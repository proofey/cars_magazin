from django.urls import path
from . import views


urlpatterns = [
    path('reset-search', views.reset_search, name='reset-search'),
    path('coupe-search/<type>', views.coupe_search, name='coupe-search'),
    path('model-search', views.model_search, name='model-search'),
    path('fuel-search/<type>', views.fuel_search, name='fuel-search'),
    path('transmission-search/<type>', views.transmission_search, name='transmission-search'),
    path('price-limit-search', views.price_limit_search, name='price-limit-search'),
    path('location-search', views.location_search, name='location-search'),
    path('year-search', views.year_search, name='year-search')
]