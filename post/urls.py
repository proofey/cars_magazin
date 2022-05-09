from django.urls import path
from . import views


urlpatterns = [
    path('new-post/', views.new_post, name='new-post'),
    path('update-post/<id>', views.update_post, name='update-post'),
    path('post-details/<id>', views.post_details, name='post-details'),
    path('delete-post/<id>', views.delete_post, name='delete-post'),
    path('follow-unfollow/<id>', views.follow_unfollow, name='follow-unfollow')
]