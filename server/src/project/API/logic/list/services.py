from API.models import List, User


def create_list(validated_data):
    list = List.objects.create(name=validated_data['name'], author=validated_data['author'])
    response = {'id': list.id, 'name': validated_data['name']}
    return response
