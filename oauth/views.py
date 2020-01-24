from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import redirect
from knox.models import AuthToken
# Create your views here.

# class Home(TemplateView):
#     template_name = 'home.html'

def Home(request):
    print(request.user)
    token = AuthToken.objects.create(request.user)
    response = redirect(f'http://localhost:3000/welcome')
    response['userToken'] = token[0]
    return(response)
