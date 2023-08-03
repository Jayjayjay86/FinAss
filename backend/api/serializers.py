from rest_framework import serializers
from .models import ExpenseRecord


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseRecord
        fields = "__all__"
