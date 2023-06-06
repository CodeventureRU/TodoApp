from API.models import User
from rest_framework_simplejwt.tokens import RefreshToken


def create_user(validated_data):
    user = User.objects.create_user(email=validated_data['email'],
                                    password=validated_data['password'])
    access_token = str(RefreshToken.for_user(user).access_token)
    refresh_token = str(RefreshToken.for_user(user))
    response = {'email': user.email,
                'refresh_token': refresh_token,
                'access_token': access_token}
    return response
