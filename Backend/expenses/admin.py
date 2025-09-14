from django.contrib import admin
from .models import Expenses, Categories
# Register your models here.

@admin.register(Expenses)
class ExpensesAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'date', 'category', 'payment_method', 'user', 'created_at')
    list_filter = ('date', 'category', 'payment_method', 'user') 
    search_fields = ('title', 'description', 'category') # to search expenses by title, description, or category in the admin panel this will show a search box in the admin panel
    ordering = ('-date', '-created_at')
    
@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('name',)