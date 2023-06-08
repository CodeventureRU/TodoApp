from rest_framework import serializers
from API.models import List, User
from API.logic.task.serializers import TaskLCSerializer


class ListLCSerializer(serializers.ModelSerializer):
    list_tasks = TaskLCSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ['id', 'name', 'list_tasks', 'author']
        extra_kwargs = {
            'author': {'write_only': True},
            'tasks': {'read_only': True}
        }


class ListRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'name']
