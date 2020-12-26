from rest_framework import serializers
from .models import Crime, Signal


class CrimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crime
        fields = ('id', 'description', 'time', 'coordinates')

class SignalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signal
        fields = ('id', 'time', 'coordinates', 'crime_match')