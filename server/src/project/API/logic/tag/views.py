from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from API.models import Tag
from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.tag.serializers import TagLCSerializer, TagRUDSerializer
from API.logic.tag.services import create_tag


class TagLCView(APIView):
    serializer_class = TagLCSerializer
    permission_classes = [IsAuthor]

    def post(self, request):
        data = get_data(request)
        user = request.user
        data['author'] = user
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        response = create_tag(data)
        return Response(response, status=status.HTTP_201_CREATED)

    def get(self, request):
        tags = Tag.objects.filter(author=request.user)
        serializer = TagLCSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagRUDView(generics.DestroyAPIView):
    serializer_class = TagRUDSerializer
    permission_classes = [IsAuthor]
    queryset = Tag.objects.all()
