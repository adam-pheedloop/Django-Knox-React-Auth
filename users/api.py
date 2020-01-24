from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
import requests
import urllib
from knox.models import AuthToken
from django.contrib.auth.models import User
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer
from django.conf import settings
from .scripts.facebook import *
from rest_framework import status

getFacebook = FacebookOauthClient(settings.FACEBOOK_APP_ID, settings.FACEBOOK_APP_SECRET)
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class OauthLoginAPI(generics.GenericAPIView):
    # serializer_class = LoginUserSerializer
    def post(self, request, *args, **kwargs):
        user_code = request.data['code']
        auth_settings = {
        'client_id':  settings.FACEBOOK_APP_ID,
        'client_secret': settings.FACEBOOK_APP_SECRET,
        'redirect_uri': 'http://localhost:3000/login/loading',
        'code': user_code,
        }
        params = urllib.parse.urlencode(auth_settings)
        #Exchange code for access token
        key_response = requests.get('https://graph.facebook.com/v5.0/oauth/access_token?'+params).json()
        #User access token to retrieve user info
        user_info = requests.get("https://graph.facebook.com/me?access_token={}&fields=name,email".format(key_response['access_token'])).json()

        #Check if user exists, if they do, log them in, else return 404
        user= User.objects.filter(username=user_info['email']).first()
        if user:
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        else: 
            return Response({
            "error": "Could not find user"
        }, status=status.HTTP_404_NOT_FOUND)

class OauthReturnTokenAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        print("Getting there!!!!!")
        pass

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user