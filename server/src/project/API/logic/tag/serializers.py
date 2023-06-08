from rest_framework import serializers
from API.models import Tag, User


class TagLCSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Tag
        fields = ['id', 'name', 'author']
        extra_kwargs = {
            'author': {'write_only': True},
        }


class TagRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
