    
from django.contrib import admin
from django.urls import path

from . import views 


urlpatterns = [
    path('api/student/documents/', views.DocumentsView.as_view()),
    # path('api/documents/upload', views.DocumentUploadView.as_view())
]