from __future__ import print_function
import time
import boto3
import urllib.request, json
import random


"""
    Function: video_to_text
    Arguments: video_url: url to the interview video
               video_format: format of the interview video
    Description: Transcrip video to text
     
"""
def video_to_text(video_url, video_format):
    # Set params for API Call
    transcribe = boto3.client('transcribe')
    job_name = video_url.split("amazonaws.com/")[1]
    job_uri = video_url
    
    # Start transcription job
    transcribe.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': job_uri},
        MediaFormat=video_format,
        LanguageCode='en-US'
    )
    while True:
        # Result returned in status
        status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
        if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
            break
    
    # Extract transcript from API response
    transcript_file_url = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
    response = urllib.request.urlopen(transcript_file_url)
    data = json.loads(response.read())
    transcription = data['results']["transcripts"][0]['transcript']
    
    return transcription.lower()

"""
    Function: grade_answer
    Arguments: answer: User answer in text format
               rubric_list: python list of words that are suppose to be included in the user response
    Description: Grade user's answer by checking if their answer mentions keywords in the rubric.
     
"""
def grade_answer(answer, rubric_list):
    keyword_missed = []
    for keyword in rubric_list:
        if keyword not in answer:
            keyword_missed.append(keyword)
            
    return keyword_missed


"""
    Function: autograder
    Arguments: video_url: url to the interview video
               video_format: format of the interview video
               rubric_list: python list of words that are suppose to be included in the user response
    Description: This is a wrapper funciton that calls grade_answer and video_to_text to evaluate the acuracy
                 of the user response.
    Returns: Python list: words in rublic_list(keywords for answer) that are missed in user response
     
"""
def autograder(video_url, video_format, rubric_list):
    transcription = video_to_text(video_url, video_format)
    keyword_missed = grade_answer(transcription, rubric_list)
    return keyword_missed
    