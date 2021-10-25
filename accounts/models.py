from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE
from django.conf import settings
# Create your models here.

class CustomUser(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profile/', null=True)
    alias = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.user.username