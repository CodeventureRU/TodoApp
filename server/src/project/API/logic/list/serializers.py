from rest_framework import serializers
from API.models import List, User


class ListLCSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    class Meta:
        model = List
        fields = ['id', 'name', 'author']
        extra_kwargs = {
            'author': {'write_only': True},
        }


class ListRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'name']
