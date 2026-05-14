from django.urls import path
from . import views

urlpatterns = [
    path('', views.JobListView.as_view(), name='job-list'),
    path('<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('post/', views.PostJobView.as_view(), name='post-job'),
    path('<int:pk>/apply/', views.ApplyJobView.as_view(), name='apply-job'),
    path('my-applications/', views.MyApplicationsView.as_view(), name='my-applications'),
    path('employer-applications/', views.EmployerApplicationsView.as_view(), name='employer-applications'),
]