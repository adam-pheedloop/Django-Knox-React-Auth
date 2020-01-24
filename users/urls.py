"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from rest_framework import routers                
from users import views
from users import api
from rest_framework import routers
from knox.views import LogoutView


router = routers.DefaultRouter()
router.register(r'register', api.RegistrationAPI)

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/register/', api.RegistrationAPI.as_view()),
    path('api/login/', api.LoginAPI.as_view()),
    path('api/user/', api.UserAPI.as_view()),
    path('api/logout/', LogoutView.as_view(), name='knox_logout'),
    path('api/oauth/facebook/', api.OauthLoginAPI.as_view()),
    path('api/oauth/facebook/success', api.OauthReturnTokenAPI.as_view())
]
    