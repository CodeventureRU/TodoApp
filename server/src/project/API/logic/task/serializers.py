from rest_framework import serializers
from API.models import Task, User


class TaskLCSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all(), write_only=True)
    tags_for_read = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'deadline', 'completed', 'tags', 'tags_for_read', 'order', 'list', 'author']
        extra_kwargs = {
            'description': {'required': False},
            'deadline': {'required': False},
            'completed': {'required': False},
            'tags': {'required': False, 'write_only': True},
            'tags_for_read': {'source': 'tags_for_read', 'read_only': True},
            'list': {'write_only': True},
        }

    def get_tags_for_read(self, obj):
        tags = obj.tags.values('id', 'name')
        return tags


class TaskRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'deadline', 'completed', 'tags', 'list']
        extra_kwargs = {
            'description': {'required': False},
            'deadline': {'required': False},
            'tags': {'required': False},
            'list': {'required': False}
        }
