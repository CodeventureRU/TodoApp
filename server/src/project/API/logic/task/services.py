from API.models import Task


def create_task(validated_data):
    tags = validated_data.pop('tags')
    task = Task.objects.create(**validated_data)
    task.tags.set(tags)
    return task.get_info()


def move_task(instance, new_list_id, old_list_id, new_order):
    if new_list_id != old_list_id:
        instance.list_id = new_list_id
        instance.save()
    instance.to(new_order)
