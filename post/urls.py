from django.urls import path
from . import views


urlpatterns = [
    path('new_post', views.new_post, name='new-post'),
    path('post_details/<id>', views.post_details, name='post-details')
]