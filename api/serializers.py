from user_profile.models import Profile
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from post.models import Extra, Coupe, Gearbox, Condition, Fuel, NumberOfDoors, Post


class ExtraSerializer(ModelSerializer):
    class Meta:
        model = Extra
        fields = '__all__'

class CoupeSerializer(ModelSerializer):
    class Meta:
        model = Coupe
        fields = '__all__'

class GearboxSerializer(ModelSerializer):
    class Meta:
        model = Gearbox
        fields = '__all__'

class ConditionSerializer(ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'

class FuelSerializer(ModelSerializer):
    class Meta:
        model = Fuel
        fields = '__all__'

class NumberOfDoorsSerializer(ModelSerializer):
    class Meta:
        model = NumberOfDoors
        fields = '__all__'


class PostSerializer(ModelSerializer):
    extras = ExtraSerializer(many=True)
    coupe = CoupeSerializer()
    gearbox = GearboxSerializer()
    condition = ConditionSerializer()
    fuel = FuelSerializer()
    number_of_doors = NumberOfDoorsSerializer()

   
    class Meta:
        model = Post
        fields = ['author', 'model', 'price', 'price_negotiable', 'year_made', 'horsepower', 'engine_size', 'mileage', 'color',
                    'new_importation', 'located_at', 'more_info', 'main_picture', 'picture_2', 'picture_3', 'picture_4',
                     'picture_5', 'picture_6', 'picture_7', 'picture_8', 'picture_9', 'picture_10', 'extras', 'coupe',
                     'gearbox', 'condition', 'fuel', 'number_of_doors', 'follow_logo', 'pk'
                ]
