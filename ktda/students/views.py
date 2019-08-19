from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError
# from django_filters import rest_framework as f

from .models  import Document
from .serializers import DocumentSerializers


class PdfUploadParser(FileUploadParser):
    media_type = 'application/pdf'

class DocumentsView(generics.ListCreateAPIView):
    # def get(self, request,  pk):
    #     student =  get_object_or_404(Student, pk=pk)
    #     documents = Document.objects.filter(student=student)
    #     serializer = DocumentSerializers(documents, many=True)
    #     return Response(serializer.data)
    queryset = Document.objects.all()
    parser_class = (PdfUploadParser,)
    serializer_class = DocumentSerializers
    # filter_backends = (f.DjangoFilterBackend,)
    filterset_fields = ('student',)


class DocumentUploadView(APIView):
    parser_class = (PdfUploadParser,)

    def put(self, request, format=None):
        if 'file' not in request.data:
            raise ParseError("Empty content")

        f = request.data['file']

        print(f)
