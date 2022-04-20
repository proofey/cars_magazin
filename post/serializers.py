from this import d
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from . models import Extra, Coupe, Gearbox, Condition, Fuel, NumberOfDoors, Post


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
        fields = '__all__'
    