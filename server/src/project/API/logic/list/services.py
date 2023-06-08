from API.models import List


def create_list(validated_data):
    list = List.objects.create(name=validated_data['name'], author=validated_data['author'])
    response = {'id': list.id, 'name': validated_data['name']}
    return response


def move_list(instance, new_order):
    instance.to(new_order)
