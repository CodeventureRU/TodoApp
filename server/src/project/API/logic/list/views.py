from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.list.serializers import ListSerializer
from API.logic.list.services import create_list


class ListView(APIView):
    serializer_class = ListSerializer
    permission_classes = [IsAuthor]

    def post(self, request):
        data = get_data(request)
        user = request.user
        data['author'] = user
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        response = create_list(data)
        return Response(response, status=status.HTTP_201_CREATED)
