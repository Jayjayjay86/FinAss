from django.urls import path
from .views import (
    list_expenses,
    create_expense,
    retrieve_expense,
    update_delete_expense,
    clear_database,
    backup_database,
    delete_backup,
    clear_backups,
    list_backups,
)

urlpatterns = [
    path("expenses/", list_expenses, name="expenses"),
    path("expense/create/", create_expense, name="expenses"),
    path("expenses/<int:pk>/", retrieve_expense, name="retrieve-expense"),
    path(
        "expenses/<int:pk>/update/", update_delete_expense, name="update-delete-expense"
    ),
    path("expenses/clear/", clear_database, name="clear_database"),
    path("expenses/backup/", backup_database, name="backup_database"),
    path("backups/", list_backups, name="list-backup"),
    path("backup/<int:pk>/", delete_backup, name="delete-backup"),
    path("backups/clear/", clear_backups, name="clear_backups"),
]
