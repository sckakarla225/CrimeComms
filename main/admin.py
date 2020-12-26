from django.contrib import admin
from .models import Crime, Signal

# Register your models here.
admin.site.register(Crime)
admin.site.register(Signal)