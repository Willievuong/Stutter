from rest_framework import serializers
from .models import * 

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'nickname', 'first_name', 'last_name', 'facebook_id', 'date_created', 'household_id', 'pin')
        read_only_fields = ['id']
