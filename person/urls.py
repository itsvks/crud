from person import views
from django.conf.urls import patterns, url


urlpatterns = patterns('',
                       url(r'^$', views.PersonList.as_view(), name='person_list'),
                       url(r'^(?P<pk>[0-9]+)/$', views.PersonDetail.as_view(), name='person_detail'),
                       url(r'^(?P<q>.+)/$', views.SearchPerson.as_view(), name='search-person'),
                       )

