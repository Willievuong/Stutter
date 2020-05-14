# Stutter
Web App Project Submission to SDHacks 2019. [Devpost](https://devpost.com/software/stutter)

## Inspiration
Monkey See, Monkey Do

## What it does
Our app is an interviewing prep app that takes a transcript of you answering interview questions via a webcam, we analyze that to see if you were able to answer the question. Additionally, the app also analyzes your facial expression to determine your other aspect when interviewing

## How we built it
React & Material UI in the front end, Django in the backend with plenty of AWS products

## Challenges we ran into
Video encoding. We had a hard time extracting videos obtain from the webcam, as they were not in the correct format for us to be able to use it in the cloud. So we had to figure out a way to encode it properly as an mp4 file
