from rest_framework import serializers
from .models import * 

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'nickname', 'first_name', 'last_name', 'facebook_id', 'date_created')
        read_only_fields = ['id']

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id', 'title', 'user_id', 'no_question','date_created', 'processed')
        read_only_fields = ['id']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'title, date_created', 'user_id', 'answer_keywords')
        read_only_fields = ['id']

class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponse
        fields = ('id', 'title', 'session_id', 'user_id', 'question_id', 'transcript', 
        'bucket_url', 'time_completion', 'facial_emotion', 'smile', 'keywords_missed', 'processed')
        read_only_fields = ['id']
