from django.urls import path
from . import views


urlpatterns = [
    path('new_post', views.new_post, name='new-post'),
    path('update_post/<id>', views.update_post, name='update-post'),
    path('post_details/<id>', views.post_details, name='post-details'),
    path('delete_post/<id>', views.delete_post, name='delete-post')
]