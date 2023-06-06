from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from API.logic.user.views import UserRegisterView
from django.urls import path

urlpatterns = [
    path('user/registration/', UserRegisterView.as_view()),
    path('user/login/', TokenObtainPairView.as_view()),
    path('user/refresh/', TokenRefreshView.as_view())
]