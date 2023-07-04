from rest_framework import serializers
from API.models import List, User
from API.logic.task.serializers import TaskLCSerializer


class ListLCSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all(), write_only=True)
    list_tasks = TaskLCSerializer(many=True, read_only=True)
    class Meta:
        model = List
        fields = ['id', 'name', 'order', 'list_tasks', 'author']
        extra_kwargs = {
            'tasks': {'read_only': True}
        }
