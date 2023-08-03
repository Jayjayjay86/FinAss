from django.contrib import admin
from .models import ExpenseRecord, RecordsBackup

admin.site.site_header = "Fin Ass"

admin.site.register(ExpenseRecord)
admin.site.register(RecordsBackup)
