def get_follow_logo(posts, request):
    for post in posts:
        post.follow_logo(request)
    return posts

def filter_posts_i_follow(posts, request):
    follows = []
    for post in posts:
        if post in request.user.profile.post_follows.all():
            follows.append(post)
    return follows