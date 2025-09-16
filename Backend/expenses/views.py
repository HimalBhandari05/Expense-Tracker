from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from .models import Expenses, Categories
from rest_framework import authentication , permissions
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ExpenseSerializer, CategorySerializer, RegisterSerializer
from rest_framework import viewsets, permissions  # viewsets le chai CRUD operations lai handle garxa automatically


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "The data is successfully",
                    "status": True,
                    "data": serializer.data,
                },
                status= status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "message":"Invalid",
                },
                serializer.error_messages,
                status=status.HTTP_400_BAD_REQUEST
            )


class LoginView(APIView):
    permission_classes = []
    
    def post(self , request):
        data = request.data
        username = data['username']
        password = data['password']
        
        user = User.objects.filter(username=username).first()
        if user and user.check_password(user):
            refresh = RefreshToken.for_user(user=user)
            return Response(
                {
                    "message":"Data Validated Successfully",
                    "access_token":refresh.access_token,
                    "refresh_token":refresh
                }
            )
        else:
            return Response(
                {
                    "message":"Invalid credentials",
                },
                status=status.HTTP_400_BAD_REQUEST
            )

# can we use function based views here? yes we can but class based views are more powerful and flexible for building APIs


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()  # yesle Categories model ko sabai instances lai query garxa
    serializer_class = CategorySerializer  # yesle chai kun serializer use garne bhanera specify garxa
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # only authenticated users can create/update/delete categories, others can only read


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer  # yesle chai kun serializer use garne bhanera specify garxa
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # only authenticated users can create/update/delete expenses, others can only read

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Expenses.objects.filter(user=self.request.user).select_related('category')
        else:
            return Expenses.objects.none()
        # yesle chai current logged in user ko expenses haru matra return garxa
        # basically select_re   lated le chai akchoti mei category ko data fetch garxa for all expenses instead of querying multiple times for each expense

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        #  yesle chai expense create garda current logged in user lai automatically assign garxa user field ma meaning user le chai user field lai manually set garna mildaina, yo chai security ko lagi ho so that user le aru ko expense create garna na sakos
