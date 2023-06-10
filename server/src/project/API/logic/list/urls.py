from API.logic.list.views import ListLCView, ListRUDView
from django.urls import path

urlpatterns = [
    path('lists/', ListLCView.as_view()),
    path('lists/<int:pk>/', ListRUDView.as_view()),
]