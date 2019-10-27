from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = {
    url(r'^$', default, name="default"),
    url(r'^profile/$', ProfileCreateView, name="profile"),
    url(r'^profile/(?P<pk>[0-9]+)/$', ProfileDetailsView, name="profile_details"),
    url(r'^session/$', SessionCreateView, name="session"),
    url(r'^session/(?P<pk>[0-9]+)/$', SessionDetailsView, name="session_details"),
    url(r'^question/$', QuestionCreateView, name="question"),
    url(r'^question/(?P<pk>[0-9]+)/$', QuestionDetailsView, name="question_details"),
    url(r'^response/$', UserResponseCreateView, name="response"),
    url(r'^response/(?P<pk>[0-9]+)/$', UserResponseDetailsView, name="response_details"),
    url(r'^savesession/$', SaveSession, name="save_session"),
    url(r'^saveresponse/(?P<filename>[^/]+)/$', SaveResponse, name="save_response"),
    url(r'^getresponse/$', GetResponse, name="get_response"),
}

urlpatterns = format_suffix_patterns(urlpatterns)