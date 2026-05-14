from rest_framework import serializers
from .models import Job, Application

class JobSerializer(serializers.ModelSerializer):
    employer_name = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id',
            'employer_name',
            'title',
            'company',
            'location',
            'job_type',
            'category',
            'salary',
            'description',
            'deadline',
            'posted_at',
        ]

    def get_employer_name(self, obj):
        return obj.employer.get_full_name() or obj.employer.username


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'applicant',
            'cv',
            'cover_letter',
            'status',
            'applied_at',
        ]