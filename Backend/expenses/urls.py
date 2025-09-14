from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet , CategoryViewSet

router = DefaultRouter()  # yesle chai automatically URL patterns haru generate garxa for the viewsets defined in views.py
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'categories', CategoryViewSet, basename='category')


urlpatterns = [
    path('api/', include(router.urls)),
]



""" URL configuration for the expenses app. yesma API endpoints haru define garxa matlab kun URL ma kun viewset call garne vanera. ani DefaultRouter le chai automatically URL patterns haru generate garxa for the viewsets defined in views.py 
For example:
- GET /api/expenses/ -> list all expenses (handled by ExpenseViewSet)
- POST /api/expenses/ -> create a new expense (handled by ExpenseViewSet)
- GET /api/expenses/{id}/ -> retrieve a specific expense by id (handled by ExpenseViewSet)
- PUT /api/expenses/{id}/ -> update a specific expense by id
- DELETE /api/expenses/{id}/ -> delete a specific expense by id
"""

