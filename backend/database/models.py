from django.db import models

class Profile(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    facebook_id = models.TextField(null=True)
    first_name = models.TextField()
    last_name = models.TextField()
    nickname = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "{}".format(self)

class Session(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    title = models.TextField(null=True)
    user_id = models.TextField(null=True)
    no_question = models.IntegerField(default=0, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    title = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user_id = models.TextField(null=True) 
    answer = models.TextField(null=True)

class UserResponse(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    title = models.TextField(null=True)
    session_id = models.TextField(null=True)
    user_id = models.TextField(null=True)
    question_id = models.TextField(null=True)
    transcript = models.TextField(null=True)
    bucket_url = models.TextField(null=True)
    time_completion = models.IntegerField(default=0, null=True)
