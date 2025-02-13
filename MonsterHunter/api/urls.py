from django.urls import path
from .views import MonsterAPIview

urlpatterns = [path("Monsters/", MonsterAPIview.as_view(), name="Monsters")]
