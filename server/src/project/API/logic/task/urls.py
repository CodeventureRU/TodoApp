from API.logic.task.views import TaskLCView, TaskRUDView
from django.urls import path

urlpatterns = [
    path('tasks/', TaskLCView.as_view()),
    path('tasks/<int:pk>/', TaskRUDView.as_view()),
]