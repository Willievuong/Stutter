from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = {
    url(r'^$', default, name="default"),
    url(r'^profile/$', ProfileCreateView, name="profile"),
    url(r'^profile/(?P<pk>[0-9]+)/$', ProfileDetailsView, name="profile_details"),
}

urlpatterns = format_suffix_patterns(urlpatterns)