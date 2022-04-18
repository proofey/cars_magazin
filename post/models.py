from email.policy import default
from django.urls import reverse
from django.core.validators import FileExtensionValidator
from django.db import models
from user_profile.models import Profile



class Extra(models.Model):
    extra = models.CharField(verbose_name='Extra', max_length=100)

    def __str__(self):
        return self.extra



class Coupe(models.Model):
    type = models.CharField(verbose_name='Coupe', max_length=30)

    def __str__(self):
        return self.type

class Gearbox(models.Model):
    type = models.CharField(verbose_name='Transmission', max_length=30)

    def __str__(self):
        return self.type

class Condition(models.Model):
    type = models.CharField(verbose_name='Condition', max_length=30)

    def __str__(self):
        return self.type

class Fuel(models.Model):
    type = models.CharField(verbose_name='Fuel', max_length=20)

    def __str__(self):
        return self.type

class NumberOfDoors(models.Model):
    number_of_doors = models.CharField(verbose_name='Number of doors', max_length=10)

    def __str__(self):
        return self.number_of_doors



class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    model = models.CharField(verbose_name='Model', max_length=100)
    price = models.IntegerField(verbose_name='Price')
    price_negotiable = models.BooleanField(verbose_name='Price negotiable', blank=True, null=True)
    year_made = models.IntegerField(verbose_name='Year')
    horsepower = models.IntegerField(verbose_name='Horsepower', blank=True, null=True)
    engine_size = models.IntegerField(verbose_name='Engine size', blank=True, null=True)
    mileage = models.IntegerField(verbose_name='Mileage')
    color = models.CharField(verbose_name='Color', max_length=30, blank=True, null=True)
    new_importation = models.BooleanField(verbose_name='New importation', blank=True, null=True)
    located_at = models.CharField(verbose_name='Located at', max_length=30)
    more_info = models.TextField(verbose_name='More information', blank=True, null=True)

    main_picture = models.ImageField(verbose_name='Main picture', upload_to='post_pictures', default='post_pictures/default_car.jpg', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_2 = models.ImageField(verbose_name='2', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_3 = models.ImageField(verbose_name='3', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_4 = models.ImageField(verbose_name='4', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_5 = models.ImageField(verbose_name='5', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_6 = models.ImageField(verbose_name='6', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_7 = models.ImageField(verbose_name='7', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_8 = models.ImageField(verbose_name='8', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_9 = models.ImageField(verbose_name='9', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    picture_10 = models.ImageField(verbose_name='10', upload_to='post_pictures', blank=True, null=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])

    extras = models.ManyToManyField(Extra, blank=True)
    coupe = models.ForeignKey(Coupe, on_delete=models.PROTECT, null=True)
    gearbox = models.ForeignKey(Gearbox, on_delete=models.PROTECT, null=True)
    condition = models.ForeignKey(Condition, on_delete=models.PROTECT, null=True)
    fuel = models.ForeignKey(Fuel, on_delete=models.PROTECT, null=True)
    number_of_doors = models.ForeignKey(NumberOfDoors, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f"{self.author} - {self.model} - {self.price}"


    def get_absolute_url(self):
        return reverse('post-details', args=[self.pk])

