from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile
from .serializers import RegisterSerializer, ProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"

            send_mail(
                subject="NepJobs - Password Reset Request",
                message=f"""
Hi {user.username},

You requested a password reset for your NepJobs account.

Click the link below to reset your password:
{reset_url}

If you did not request this, please ignore this email.

Best regards,
NepJobs Team 💼
                """,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({'message': 'Password reset email sent!'})
        except User.DoesNotExist:
            return Response(
                {'error': 'No account found with this email!'},
                status=status.HTTP_404_NOT_FOUND
            )

class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        password = request.data.get('password')

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)

            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({'message': 'Password reset successful!'})
            else:
                return Response(
                    {'error': 'Invalid or expired token!'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception:
            return Response(
                {'error': 'Something went wrong!'},
                status=status.HTTP_400_BAD_REQUEST
            )