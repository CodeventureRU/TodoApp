from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from API.models import Task
from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.task.serializers import TaskLCSerializer, TaskRUDSerializer
from API.logic.task.services import create_task


class TaskLCView(APIView):
    serializer_class = TaskLCSerializer
    permission_classes = [IsAuthor]

    def post(self, request):
        data = get_data(request)
        user = request.user
        data['author'] = user.id
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        response = create_task(serializer.validated_data)
        return Response(response, status=status.HTTP_201_CREATED)

    def get(self, request):
        tasks = Task.objects.filter(author=request.user)
        serializer = TaskLCSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskRUDSerializer
    permission_classes = [IsAuthor]
    queryset = Task.objects.all()
