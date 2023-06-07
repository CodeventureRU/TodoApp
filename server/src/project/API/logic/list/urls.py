from API.logic.list.views import ListView
from django.urls import path

urlpatterns = [
    path('lists/', ListView.as_view()),
]