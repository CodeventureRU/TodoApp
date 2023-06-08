from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from API.models import List
from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.list.serializers import ListLCSerializer, ListRUDSerializer
from API.logic.list.services import create_list


class ListLCView(APIView):
    serializer_class = ListLCSerializer
    permission_classes = [IsAuthor]

    def post(self, request):
        data = get_data(request)
        user = request.user
        data['author'] = user
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        response = create_list(data)
        return Response(response, status=status.HTTP_201_CREATED)

    def get(self, request):
        lists = List.objects.prefetch_related('list_tasks').filter(author=request.user)
        serializer = ListLCSerializer(lists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ListRUDSerializer
    permission_classes = [IsAuthor]
    queryset = List.objects.all()
