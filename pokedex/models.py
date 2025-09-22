from django.db import models

class Pokemon(models.Model):
    number = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=100)
    type_primary = models.CharField(max_length=50)
    type_secondary = models.CharField(max_length=50, blank=True, null=True)
    image = models.URLField(blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['number']

    def __str__(self):
        return f"#{self.number} {self.name}"