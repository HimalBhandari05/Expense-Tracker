from django.contrib import admin
from django.urls import path, include
from expenses.views import RegisterView, LoginView, PaymentView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/register/", RegisterView.as_view()),
    path("api/login/", LoginView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/paymentoption/", PaymentView.as_view()),
    path("", include("expenses.urls")),  # include the URLs from the expenses app
]