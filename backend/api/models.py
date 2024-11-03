from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title

class Todo(models.Model):
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    llm_response = models.TextField()


    def __str__(self):
        return self.title