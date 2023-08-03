from .models import ExpenseRecord, RecordsBackup
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpenseSerializer
from datetime import datetime
import json


@api_view(["GET"])
def backup_database(request):
    expenses = ExpenseRecord.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)

    # Define a dictionary to store the data
    data = {"date": datetime.today().strftime("%Y-%m-%d"), "expense_details": []}

    # Loop through the Django objects and add them to the dictionary
    if expenses:
        try:
            for expense in expenses:
                expense = {
                    "id": expense.id,
                    "description": expense.description,
                    "purpose": expense.purpose,
                    "amount": expense.amount,
                    "is_debt": expense.is_debt,
                    "debt_amount": expense.debt_amount,
                    "is_weekly": expense.is_weekly,
                    "is_monthly": expense.is_monthly,
                    "is_income": expense.is_income,
                    "created": str(expense.created),
                    "date": expense.date.strftime("%Y-%m-%d"),
                }

                data["expense_details"].append(expense)

            # Save the data as a JSON file with the date and time in the filename
            now = datetime.now()
            date_string = now.strftime("%m-%d")
            filename = f"data_{date_string}.json"
            with open(filename, "w") as file:
                json.dump(data, file, indent=2)
                RecordsBackup.objects.create(records=str(data))

        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_418_IM_A_TEAPOT)

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def clear_database(request):
    ExpenseRecord.objects.all().delete()
    print("database cleared")
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def list_expenses(request):
    expenses = ExpenseRecord.objects.order_by("-date")
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(["GET"])
def list_backups(request):
    backups = BackupRecords.objects.all()
    serializer = ExpenseSerializer(backups, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(["DELETE"])
def delete_backup(request, pk):
    try:
        backup = ExpenseRecord.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response(
            {"error": "backup record not found"}, status=status.HTTP_404_NOT_FOUND
        )

        backup.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def clear_backups(request):
    BackupRecords.objects.all().delete()
    print("backups cleared")
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def create_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def retrieve_expense(request, pk):
    try:
        expense = ExpenseRecord.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response(
            {"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = ExpenseSerializer(expense)
    return Response(serializer.data)


@api_view(["PUT", "DELETE"])
def update_delete_expense(request, pk):
    try:
        expense = ExpenseRecord.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response(
            {"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
