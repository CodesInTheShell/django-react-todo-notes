from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, TodoSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Note, Todo
from openai import OpenAI

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Todo.objects.filter()
    
    def perform_create(self, serializer):


        if serializer.is_valid():

            title = serializer.validated_data.get('title')
            print('title: ', title)


            client = OpenAI()

            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that suggest things to be prepared based on users todo task."},
                    {
                        "role": "user",
                        "content": f"What are the things needed for this todo task?\n\nTODO:{title}"
                    }
                ]
            )

            llm_response = completion.choices[0].message

            serializer.save(llm_response=llm_response, status=False)

        else:
            print('serializer.errors: ', serializer.errors)

       


