from django.contrib import admin
from django.urls import include, path
from app.views import AuthViews

urlpatterns = [
    path('auth/register/', AuthViews.register, name="auth.register"),
    path('auth/login/', AuthViews.login, name="auth.login"),
    path('get/user/', AuthViews.get_user, name="get.user"),
]
