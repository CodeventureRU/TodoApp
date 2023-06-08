from API.models import Task


def create_task(validated_data):
    tags = validated_data.pop('tags')
    task = Task.objects.create(**validated_data)
    task.tags.set(tags)
    return task.get_info()
