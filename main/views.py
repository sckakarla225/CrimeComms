from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CrimeSerializer, SignalSerializer
from .models import Crime, Signal

from math import radians, cos, sin, sqrt, atan2
from datetime import datetime
import random

# Create your views here.

@api_view(['GET'])
def getAllCrimes(request):
    crimes = Crime.objects.all()
    serializer = CrimeSerializer(crimes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getAllSignals(request):
    signals = Signal.objects.all()
    serializer = SignalSerializer(signals, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def sendCrime(request):
    crime = request.data
    serializer = CrimeSerializer(data=crime)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(data={
            "success": "Crime was sent"
        })
    else:
        return Response(data={
            "failure": "Signal failed"
        })


@api_view(['POST'])
def sendSignal(request):
    signal = request.data
    
    latitude = signal["coordinates"][0]
    longitude = signal["coordinates"][1]
    new_lat = random.uniform(latitude - 0.05, latitude + 0.05)
    new_long = random.uniform(longitude - 0.05, longitude + 0.05)
    signal["coordinates"][0] = new_lat
    signal["coordinates"][1] = new_long

    serializer = SignalSerializer(data=signal)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(data={
            "success": "Signal was sent"
        })
    else:
        return Response(data={
            "failure": "Signal failed"
        })


# CRIME MATCH ALGORITHM

def determineCrimeMatch(signal):
    all_crimes = Crime.objects.all()
    crimes = []
    
    for crime in all_crimes:
        if crime["time"] <= signal["time"]:
            crimes.append(crime)
    
    distances = []
    sig_lat = radians(int(signal["coordinates"][0]))
    sig_long = radians(int(signal["coordinates"][1]))
    radius = 6373.0
    
    for crime in crimes:
        crime_lat = radians(int(crime["coordinates"][0]))
        crime_long = radians(int(crime["coordinates"][1]))
        d_lat = crime_lat - sig_lat # 2 - 1
        d_long = crime_long - sig_long # 2 - 1
        a = sin(d_lat / 2)**2 + cos(sig_lat) * cos(crime_lat) * sin(d_long / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = radius * c
        distances.append(distance)

    smallest_distances_index = []
    distances_count = 0
    
    for distance in distances:
        index = distances.index(min(distances))
        smallest_distances_index.append(index)
        distances.pop(index)
        distances_count += 1
        if (distances_count == 3):
            break
        else:
            continue

    final_crimes = []

    for index in smallest_distances_index:
        final_crimes.append(crimes[index])

    times = []
    print(final_crimes)

    for i in range(3):
        duration = signal["time"] - final_crimes[i]["time"].total_seconds()
        times.append(duration)

    index_of_lowest_time = times.index(min(times))
    crime_match = crimes[index_of_lowest_time].id

    return crime_match