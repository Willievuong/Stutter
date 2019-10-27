import logging
import boto3
from botocore.exceptions import ClientError


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket
    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
        # print(response)
    except ClientError as e:
        logging.error(e)
        return False
    return True

s3 = boto3.resource('s3')

# my_bucket = ""

# # Print out bucket names
# for bucket in s3.buckets.all():
#     if bucket.name == 'stutter':
#         my_bucket = bucket
#         # for obj in bucket.objects.all():
#         #     print(obj.id)

# data = open('sample.mp4', 'rb')
# # response = upload_file('sample.mp4', 'stutter', object_name="AnotherMonkey4.mp4")
# response = s3.Bucket('stutter').put_object(Key='mooovie.mp4', Body=data)

print(s3.attributes)

