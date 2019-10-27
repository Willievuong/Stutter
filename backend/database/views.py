from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from django.core.files.storage import default_storage
from .serializer import *
from .models import * 
import base64 
import logging
import boto3
from botocore.exceptions import ClientError
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
import os
import ffmpeg
import json


@api_view(['GET'])
def default(request):
    msg = {
        'msg': "Nothing to see here"
    }
    
    return Response(msg, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def ProfileCreateView(request):
    if request.method == 'GET':
        queryset = Profile.objects.all()
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def ProfileDetailsView(request, pk):
    try:
        query = Profile.objects.get(pk=pk)
    except query.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(query)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def SessionCreateView(request):
    if request.method == 'GET':
        queryset = Session.objects.all()
        serializer = SessionSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def SessionDetailsView(request, pk):
    try:
        query = Session.objects.get(pk=pk)
    except query.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SessionSerializer(query)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SessionSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def QuestionCreateView(request):
    if request.method == 'GET':
        queryset = Question.objects.all()
        serializer = QuestionSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def QuestionDetailsView(request, pk):
    try:
        query = Question.objects.get(pk=pk)
    except query.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(query)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QuestionSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def UserResponseCreateView(request):
    if request.method == 'GET':
        queryset = UserResponse.objects.all()
        serializer = UserResponseSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def UserResponseDetailsView(request, pk):
    try:
        query = UserResponse.objects.get(pk=pk)
    except query.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserResponseSerializer(query)
        return Response(serializer.data)
    elif request.method == 'PUT':
        keyword = request.data['keywords_missed']
        request.data['keywords_missed'] = json.dumps(keyword)
        serializer = UserResponseSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def SaveSession(request):
    # Hard Coded Data 
    user_id = 1
    title = str(user_id) + "A"
    no_question = 3

    request.data['user_id'] = user_id
    request.data['title'] = title
    request.data['no_question'] = no_question

    serializer = SessionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@parser_classes([FileUploadParser])
def SaveResponse(request, filename, format=None):
    title = request.META['HTTP_TITLE']
    mp4_title = title + ".mp4"
    title = title + ".webm"
    session_id = request.META['HTTP_SESSIONID']
    question_id = request.META['HTTP_QUESTIONID']

    data = request.data['file']

    with default_storage.open(title, 'wb+') as destination:
        for chunk in data.chunks():
            destination.write(chunk)

    stream = ffmpeg.input(title)
    stream = ffmpeg.output(stream, mp4_title)
    ffmpeg.run(stream)

    # Accessing the S3 Data
    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket('stutter')
   
    # # Creating writeable video and write the decoding result
    video_result = open(mp4_title, 'rb')
   
    response = my_bucket.put_object(Key=title, Body=video_result)

    # Concating the URL 
    bucket_name = "stutter"
    region = ".s3-us-west-1."
    bucket_url = "https://"+ bucket_name + region + "amazonaws.com/"
    
    # request.data['bucket_url'] = bucket_url

    answer = {
        "title": title, 
        "session_id": session_id,
        "user_id": 1,
        "question_id": question_id, 
        "bucket_url": bucket_url + title
    }

    serializer = UserResponseSerializer(data=answer)
    if serializer.is_valid(): 
        serializer.save() 

        os.remove(title)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_4008_BAD_REQUEST)

@api_view(['POST'])
def GetSession(request):
    '''
        Return all user response with a corresponding session id 
    '''
    
    serializer = SessionSerializer(data=request.data)
    
    
    if serializer.is_valid():
        serializer.save()
    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
