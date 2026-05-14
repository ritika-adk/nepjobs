from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    JOB_TYPE = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    ]

    CATEGORY = [
        ('it', 'IT & Software'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('health', 'Health'),
        ('other', 'Other'),
    ]

    employer    = models.ForeignKey(User, on_delete=models.CASCADE)
    title       = models.CharField(max_length=200)
    company     = models.CharField(max_length=200)
    location    = models.CharField(max_length=100)
    job_type    = models.CharField(max_length=20, choices=JOB_TYPE)
    category    = models.CharField(max_length=20, choices=CATEGORY)
    salary      = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    deadline    = models.DateField()
    posted_at   = models.DateTimeField(auto_now_add=True)
    is_active   = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    STATUS = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    job          = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant    = models.ForeignKey(User, on_delete=models.CASCADE)
    cv           = models.FileField(upload_to='cvs/')
    cover_letter = models.TextField(blank=True)
    status       = models.CharField(max_length=20, choices=STATUS, default='pending')
    applied_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant} - {self.job}"