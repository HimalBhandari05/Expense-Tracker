from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Expenses , Categories
from .serializers import ExpenseSerializer , CategorySerializer
from rest_framework import viewsets, permissions # viewsets le chai CRUD operations lai handle garxa automatically


# can we use function based views here? yes we can but class based views are more powerful and flexible for building APIs  

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all() # yesle Categories model ko sabai instances lai query garxa
    serializer_class = CategorySerializer # yesle chai kun serializer use garne bhanera specify garxa
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # only authenticated users can create/update/delete categories, others can only read
    

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all() # yesle Expenses model ko sabai instances lai query garxa
    serializer_class = ExpenseSerializer # yesle chai kun serializer use garne bhanera specify garxa
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # only authenticated users can create/update/delete expenses, others can only read
    
    def get_queryset(self):
        return Expenses.objects.filter(user= self.request.user).select_related('category')
        # yesle chai current logged in user ko expenses haru matra return garxa
        # basically select_related le chai akchoti mei category ko data fetch garxa for all expenses instead of querying multiple times for each expense
        
    def perform_create(self , serializer):
        serializer.save(user=self.request.user) 
        #  yesle chai expense create garda current logged in user lai automatically assign garxa user field ma meaning user le chai user field lai manually set garna mildaina, yo chai security ko lagi ho so that user le aru ko expense create garna na sakos
        