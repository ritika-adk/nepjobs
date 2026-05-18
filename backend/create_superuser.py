import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nepjobs.settings')
django.setup()

from django.contrib.auth.models import User

username = os.environ.get('SUPERUSER_USERNAME', 'admin')
email = os.environ.get('SUPERUSER_EMAIL', 'admin@gmail.com')
password = os.environ.get('SUPERUSER_PASSWORD', 'admin@100%')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser {username} created!')
else:
    print(f'Superuser {username} already exists!')