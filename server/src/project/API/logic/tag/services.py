from API.models import Tag


def create_tag(validated_data):
    tag = Tag.objects.create(name=validated_data['name'], author=validated_data['author'])
    response = {'id': tag.id, 'name': validated_data['name']}
    return response
