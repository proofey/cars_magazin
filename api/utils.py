def get_follow_logo(posts, request):
    for post in posts:
        post.follow_logo(request)
    return posts