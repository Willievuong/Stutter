import requests 
import time 
import json
from autograder.autograder import autograder
from faceDetection.faceDetection import faceDetection

backend_url = 'http://83147b49.ngrok.io/response/'
keyword_q1 = ['1']
keyword_q2 = ['1']
keyword_q3 = ['1']
keyword_list = [keyword_q1, keyword_q2, keyword_q3]

while True: 
    # Get reqeust to backend retrive list of all userResponses
    r = requests.get(backend_url)
    if r.status_code != 200:
        print("GET request to backend FAILED")
    else:
        userResponses = r.json()

        for userResponse in userResponses:
            # Find unprocessed userResponse
            if userResponse['facial_emotion'] == None:
                video_url = userResponse['bucket_url']
                video_format = "mp4"
                keyword = keyword_list[int(userResponse['question_id'])-1]
                bucketName = "stutter"
                videoName = userResponse['title']
                roleArn = "arn:aws:iam::319974506975:role/RekAdmin"


                # Run ML on unprocessed userResponse
                keyword_missed = autograder(video_url, video_format, keyword)
                faceDetectionResult = faceDetection(roleArn, bucketName, videoName)
                
                facial_emotion = faceDetectionResult['emotion']
                smile = faceDetectionResult['smile']

                # Update userResponse
                userResponse['keywords_missed'] = keyword_missed
                userResponse['facial_emotion'] = facial_emotion
                userResponse['smile'] = smile

                response = requests.put(backend_url+userResponse['user_id']+'/', json=userResponse)
                print(response)
    time.sleep(10)
    

   


    # Look for incompleted / userresponse that has not been processed
    # GET REQUEST to backend route will give list, which you then check for incompleteness 






    # time.sleep(300) #Sleep for 5 minutes 

