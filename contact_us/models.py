from django.db import models
from django.contrib.auth.models import User


class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField('Your Email(optional)', null=True, blank=True)
    message = models.TextField('Message')
    seen = models.BooleanField('Seen', default=False)

    def __str__(self):
        return f"{self.user} -- {self.message[:20]}"
