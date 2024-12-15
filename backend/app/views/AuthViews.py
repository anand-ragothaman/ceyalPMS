from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from app.serializers import UserSerializer, UserSettingsSerializer


# from app.utils import validate_required_fields


@api_view(['POST'])
def register(request):
    # required_fields = ['first_name',
    #                    'last_name',
    #                    'email',
    #                    'username',
    #                    'password',
    #                    'confirm_password'
    #                    ]

    # validation_error = validate_required_fields(required_fields, request.data)
    # if validation_error:
    #     return validation_error

    # if request.data.get('password') != request.data.get('confirm_password'):
    #     return Response({'error': 'Password did not match!'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    fields = ['username', 'password']
    for x in fields:
        if x not in request.data or request.data.get(x) == '':
            return Response({"error": f"{x.capitalize().replace('_', ' ')} field is required"}, status=status.HTTP_428_PRECONDITION_REQUIRED)

    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
