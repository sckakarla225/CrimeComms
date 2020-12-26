from django.urls import path
from . import views

urlpatterns = [
    path('get_crimes/', views.getAllCrimes, name="Get All Crimes"), 
    path('get_signals/', views.getAllSignals, name="Get All Signals"), 
    path('send_crime/', views.sendCrime, name="Send Crime"), 
    path('send_signal/', views.sendSignal, name="Send Signal"), 
]