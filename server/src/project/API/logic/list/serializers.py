from rest_framework import serializers
from API.models import List, User


class ListSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    class Meta:
        model = List
        fields = ['name', 'author']
