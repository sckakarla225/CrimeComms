from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Crime(models.Model):
    description = models.CharField(max_length=250, blank=False, null=True)
    time = models.TimeField(auto_now_add=True, auto_now=False)
    coordinates = ArrayField(models.FloatField(), size=2)

    def __str__(self):
        return str(self.coordinates)
    
class Signal(models.Model):
    time = models.TimeField(auto_now_add=True, auto_now=False)
    coordinates = ArrayField(models.FloatField(), size=2)
    crime_match = models.IntegerField(default=0)

    def __str__(self):
        return str(self.coordinates)
    