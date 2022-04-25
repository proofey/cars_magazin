from post.models import Post



CACHED_SEARCH = []


def check_cache_for_coupe(type):
    if len(CACHED_SEARCH) > 0:
        for post in CACHED_SEARCH:
            if post.coupe.type != type:
                CACHED_SEARCH.remove(post)
        return CACHED_SEARCH
    else:
        posts = Post.objects.filter(coupe__type=type)
        for post in posts:
            CACHED_SEARCH.append(post)
        return CACHED_SEARCH