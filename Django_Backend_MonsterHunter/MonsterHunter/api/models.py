from django.db import models


# Create your models here.
class Monster(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    feuer = models.CharField(max_length=50)
    wasser = models.CharField(max_length=50)
    eis = models.CharField(max_length=50)
    blitz = models.CharField(max_length=50)
    gift = models.CharField(max_length=50)
    lähmung = models.CharField(max_length=50)
    explosion = models.CharField(max_length=50)
    schlaf = models.CharField(max_length=50)
