from django.contrib.auth.models import User
from rest_framework import serializers 
from .models import Note, Todo



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}} # no one can read the password, only write
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'author', 'title', 'content', 'created_at']
        extra_kwargs = {'author': {'read_only': True}}

class TodoSerializer(serializers.ModelSerializer):
    llm_response = serializers.CharField(required=False)
    status = serializers.CharField(required=False)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'status', 'llm_response']