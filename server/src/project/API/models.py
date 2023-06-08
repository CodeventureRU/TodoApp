from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinLengthValidator
from ordered_model.models import OrderedModel


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email должен быть указан")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(max_length=128, unique=True)
    username = models.CharField(unique=False, blank=True)
    password = models.CharField(validators=[MinLengthValidator(8)], max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    objects = CustomUserManager()


class List(OrderedModel):
    name = models.CharField(max_length=64)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lists')

    class Meta:
        ordering = ['order']


class Tag(models.Model):
    name = models.CharField(max_length=32)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tags')


class Task(OrderedModel):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    deadline = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='list_tasks')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tasks')

    order_with_respect_to = 'list'

    def get_info(self):
        tags = list(self.tags.values_list('name', flat=True))

        return {'name': self.name,
                'description': self.description,
                'deadline': self.deadline,
                'completed': self.completed,
                'list': {'id': self.list_id,
                         'name': self.list.name},
                'tags': tags,
                'order': self.order}

    class Meta:
        ordering = ['order']
