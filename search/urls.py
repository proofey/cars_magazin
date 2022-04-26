from django.urls import path
from . import views


urlpatterns = [
    path('coupe-search/<type>', views.coupe_search, name='coupe-search'),
    path('model-search', views.model_search, name='model-search')
]