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
        read_only_fields = ['employer_name', 'posted_at']

    def get_employer_name(self, obj):
        return obj.employer.get_full_name() or obj.employer.username


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.SerializerMethodField()
    applicant_name = serializers.SerializerMethodField()
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'job_title',
            'applicant',
            'applicant_name',
            'cv',
            'cv_url',
            'cover_letter',
            'status',
            'applied_at',
        ]
        read_only_fields = ['applicant', 'status', 'applied_at']

    def get_job_title(self, obj):
        return obj.job.title

    def get_applicant_name(self, obj):
        return obj.applicant.username

    def get_cv_url(self, obj):
        if obj.cv:
            return obj.cv.url
        return None
        