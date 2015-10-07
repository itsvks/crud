from django.db.models import Q
from rest_framework import generics
from person.models import Person
from person.serializers import PersonSerializer
from django.shortcuts import render


# Create your views here.


class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class SearchPerson(generics.ListAPIView):
    serializer_class = PersonSerializer

    def get_queryset(self):
        q = self.kwargs['q']
        return Person.objects.filter(
            Q(first_name__iexact=q) | Q(email__iexact=q))
