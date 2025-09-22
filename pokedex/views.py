from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Pokemon
from .serializers import PokemonSerializer

# 👇 Vista API
class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# 👇 Vista frontend (plantilla base.html)
def home(request):
    return render(request, 'pokedex/base.html')