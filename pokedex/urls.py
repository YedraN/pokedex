from django.urls import path, include
from rest_framework import routers
from .views import PokemonViewSet, home

router = routers.DefaultRouter()
router.register(r'pokemon', PokemonViewSet)

urlpatterns = [
    path('', home, name='home'),       # 👈 esta ruta abre el frontend
    path('api/', include(router.urls)) # 👈 tus endpoints API
]