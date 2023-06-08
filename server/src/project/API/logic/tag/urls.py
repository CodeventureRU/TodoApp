from API.logic.tag.views import TagLCView, TagRUDView
from django.urls import path

urlpatterns = [
    path('tags/', TagLCView.as_view()),
    path('tags/<int:pk>/', TagRUDView.as_view()),
]