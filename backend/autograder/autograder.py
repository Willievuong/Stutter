from __future__ import print_function
import time
import boto3
import urllib.request, json
import random


"""
    Function: vedio_to_text
    Arguments: vedio_url: url to the interview vedio
               vedio_format: format of the interview vedio
    Description: Transcrip vedio to text
     
"""
def vedio_to_text(vedio_url, vedio_format):
    # Set params for API Call
    transcribe = boto3.client('transcribe')
    job_name = vedio_url.split("amazonaws.com/")[1]
    job_uri = vedio_url
    
    # Start transcription job
    transcribe.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': job_uri},
        MediaFormat=vedio_format,
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
    Arguments: vedio_url: url to the interview vedio
               vedio_format: format of the interview vedio
               rubric_list: python list of words that are suppose to be included in the user response
    Description: This is a wrapper funciton that calls grade_answer and vedio_to_text to evaluate the acuracy
                 of the user response.
    Returns: Python list: words in rublic_list(keywords for answer) that are missed in user response
     
"""
def autograder(vedio_url, vedio_format, rubric_list):
    transcription = vedio_to_text(vedio_url, vedio_format)
    keyword_missed = grade_answer(transcription, rubric_list)
    return keyword_missed
    