from django.contrib.auth.decorators import user_passes_test
from django.conf import settings

def anonymous_required(function=None, redirect_url=None):

   if not redirect_url:
       redirect_url = settings.REDIRECT_URL

   actual_decorator = user_passes_test(
       lambda u: u.is_anonymous,
       login_url=redirect_url
   )

   if function:
       return actual_decorator(function)
   return actual_decorator


def filter_posts_i_follow(request, posts):
    follows = []
    for post in posts:
        if post in request.user.profile.post_follows.all():
            follows.append(post)
    return follows