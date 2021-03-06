from django.dispatch import receiver
from django.db.models.signals import post_save
from django.db import models
from django.contrib.auth.models import User




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='profile_pics', default='profile_pics/default_profile_pic.jpg')
    city = models.CharField(max_length=30, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    post_follows = models.ManyToManyField(to='post.POST')
    

    def __str__(self):
        return f"{self.user}"

    def get_name(self):
        if self.first_name or self.last_name:
            return f"{self.first_name} {self.last_name}"
        else:
            return self.user

@receiver(post_save, sender=User)
def post_save_new_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)

