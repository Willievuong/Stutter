from VedioDetect import VideoDetect
import boto3
import json
import sys
import time

"""
    Function: most_frequent
    Description: Helper method that returns the most frequent element in a python list
    Argument: python list
    Return: Most frequent element
"""
def most_frequent(List): 
    return max(set(List), key = List.count) 


"""
    Function: faceDetection
    Description:    Process interview vedio, analysing the emotion of user and 
                    whether he or she smiles during the interview
    Arguments:      roleArn: AWS configuration
                    bucketName: Name of teh AWS S3 bucket
                    vedioName: Name of the interview vedio stored in S3 bucket
            
    Return:         Dict: {emotion, smile}
"""       
def faceDetection(roleArn, bucketName, vedioName):
    analyzer=VideoDetect(roleArn, bucketName,vedioName)
    analyzer.CreateTopicandQueue()

    analyzer.StartFaceDetection()
    if analyzer.GetSQSMessageSuccess()==True:
        results = analyzer.GetFaceDetectionResults()
    
    analyzer.DeleteTopicandQueue()
    
    emotion_list = []
    smile_count = []
    for face in results['Faces']:
        # Count positive prediction for smile
        smile_count.append(face['Face']['Smile']['Value'])

        # Sort emotions at all timestamp
        emotion_dicts = face['Face']['Emotions']
        emotion_dicts = sorted(emotion_dicts, key = lambda i: i['Confidence'], reverse=True)

        # Store most confident emotion predict in a list
        emotion_list.append(emotion_dicts[0]['Type'])

    faceDetectionResult = {
        # Find the most frequent emotion as final guess 
        "emotion": most_frequent(emotion_list),
        # Find the majority guess for smile as final guess
        "smile": most_frequent(smile_count)
    }

    return faceDetectionResult
