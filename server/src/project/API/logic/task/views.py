from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from API.models import Task
from API.permissions import IsAuthor
from API.logic.functions import get_data
from API.logic.task.serializers import TaskLCSerializer, TaskRUDSerializer
from API.logic.task.services import create_task, move_task


class TaskLCView(APIView):
    serializer_class = TaskLCSerializer
    permission_classes = [IsAuthor]

    def post(self, request):
        data = get_data(request)
        user = request.user
        data['author'] = user
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

    def patch(self, request, pk, *args, **kwargs):
        data = get_data(request)
        if 'list_id' not in data:
            return super().patch(request, *args, **kwargs)
        task = Task.objects.get(pk=pk)
        move_task(task, data['list_id'], task.list_id, data['order'])
        return Response(status=status.HTTP_204_NO_CONTENT)
