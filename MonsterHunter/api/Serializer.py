from rest_framework import serializers
from .models import Monster


class MonsterAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = [
            "id",
            "name",
            "feuer",
            "wasser",
            "eis",
            "blitz",
            "gift",
            "lähmung",
            "explosion",
            "schlaf",
        ]
