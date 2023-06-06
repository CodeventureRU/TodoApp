from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from API.logic.functions import get_data
from API.logic.user.serializers import RegisterSerializer
from API.logic.user.services import create_user


class UserRegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        data = get_data(request)
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = create_user(serializer.validated_data)
        return Response(user, status=status.HTTP_201_CREATED)
