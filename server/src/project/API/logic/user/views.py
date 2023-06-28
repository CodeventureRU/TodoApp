from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError

from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.user.serializers import RegisterSerializer, UserSerializer
from API.logic.user.services import create_user


class UserRegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        data = get_data(request)
        if 'confirm_password' in data and data['password'] == data['confirm_password']:
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
            user = create_user(serializer.validated_data)
            return Response(user, status=status.HTTP_201_CREATED)
        else:
            raise ValidationError({'confirm_password': ['Поле пароль и подтверждение пароля не совпадают']})


class UserView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthor]

    def get(self, request):
        user = request.user
        return Response(user.get_info(), status=status.HTTP_200_OK)
