import requests 
import time 
import json
from autograder.autograder import autograder
from faceDetection.faceDetection import faceDetection

backend_url = 'http://83147b49.ngrok.io/response/'
keyword_q1 = ['BST', 'node', 'data structure', 'leaf']
keyword_q2 = ['git', 'add', 'commit', 'version control', 'branch']
keyword_q3 = ['version control', 'remote', 'local', 'push', 'pull']
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
            if userResponse['processed'] == False:
                video_url = userResponse['bucket_url']
                video_format = "mp4"
                keywords = keyword_list[int(userResponse['question_id'])-1]
                bucketName = "stutter"
                videoName = userResponse['title']
                roleArn = "arn:aws:iam::319974506975:role/RekAdmin"


                # Run ML on unprocessed userResponse
                keyword_missed = autograder(video_url, video_format, keywords)
                faceDetectionResult = faceDetection(roleArn, bucketName, videoName)
                
                facial_emotion = faceDetectionResult['emotion']
                smile = faceDetectionResult['smile']

                # Update userResponse
                userResponse['keywords_missed'] = keyword_missed
                userResponse['facial_emotion'] = facial_emotion
                userResponse['smile'] = smile
                userResponse['processed'] = True

                response = requests.put(backend_url+str(userResponse['id'])+'/', json=userResponse)
                
                updatedUserResponses = requests.get(backend_url).json()
                count = 0 
                for updatedUserResponse in updatedUserResponses:
                    if updatedUserResponse['processed'] == True and updatedUserResponse['session_id'] == userResponse['session_id']:
                        count += 1
                if count == 3:
                    session = requests.get('http://83147b49.ngrok.io/session/'+userResponse['session_id']+'/').json()
                    session['processed'] = True
                    response = requests.put('http://83147b49.ngrok.io/session/'+userResponse['session_id']+'/', json=session)
    time.sleep(300)


