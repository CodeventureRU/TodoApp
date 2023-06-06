from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator


class User(AbstractUser):
    email = models.EmailField(max_length=128, unique=True)
    password = models.CharField(validators=[MinLengthValidator(8)], max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']


class List(models.Model):
    name = models.CharField(max_length=64)


class Tag(models.Model):
    name = models.CharField(max_length=32)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tags')


class Task(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    deadline = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='tasks')
