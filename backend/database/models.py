from django.db import models

class Profile(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    facebook_id = models.TextField(null=True)
    first_name = models.TextField()
    last_name = models.TextField()
    nickname = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    household_id = models.TextField(null=True)
    pin = models.TextField(null=True) #TODO: Not doing this in plaintext...

    def __str__(self):
        return "{}".format(self)
