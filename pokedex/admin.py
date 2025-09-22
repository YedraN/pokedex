from django.contrib import admin
from .models import Pokemon

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('number','name','type_primary','type_secondary')
    search_fields = ('name','number')