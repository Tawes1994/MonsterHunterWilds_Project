from django.shortcuts import render
from rest_framework import generics
from .models import Monster
from .Serializer import MonsterAPISerializer


# Create your views here.
class MonsterAPIview(generics.ListAPIView):

    queryset = Monster.objects.all()
    serializer_class = MonsterAPISerializer
