# this helps to serialize the Expense model instances into JSON format for API responses
from rest_framework import serializers
from .models import Expenses, Categories
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer): # how this works is explained in views.py 
    class Meta:
        model = Categories
        fields = ['id', 'name', 'description'] # include id, name and description fields in the serialized output eg. {"id": 1, "name": "Food", "description": "Food expenses"}
        
    
class ExpenseSerializer(serializers.ModelSerializer): # yesle chai expense model lai serialize garxa 
    category = CategorySerializer(read_only=True) # nested serializer to include category details eg. of nested {"category": {"id": 1, "name": "Food"}}

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Categories.objects.all(), source='category', write_only=True, required=False
    ) 
    
    user = serializers.StringRelatedField(read_only=True) # to show username instead of user id in serialized output
    
    class Meta: # yesle chai kun model lai serialize garne ra kun fields haru include garne bhanera specify garxa
        model = Expenses
        fields = [
            'id', 'user', 'title', 'amount', 'date', 'category', 'category_id', 
            'payment_method', 'description', 'created_at', 'updated_at'
        ] # include these fields in the serialized output

        read_only_fields = ['id', 'user', 'created_at', 'updated_at'] # make these fields read-only matlab user le create/update garna mildaina data such as id and timestamps in API requests
        
    def validate_amount(self, value):
        """Validate that amount is greater than zero"""
        if value <= 0: # value 0 or less xa ki nai bhanera check garxa
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value # value user lai return garxa if validation pass garyo vani
    
    def validate(self, data):
        """Additional validation for the entire object"""
        return data