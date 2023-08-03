from django.db import models


class RecordsBackup(models.Model):
    id = models.AutoField(auto_created=True, unique=True, primary_key=True)
    records = models.CharField(max_length=100000)
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.created.strftime('%d-%m-%Y')}"

    class Meta:
        verbose_name = "Back-Up"
        verbose_name_plural = "Back-Ups"


# Create your models here.
class ExpenseRecord(models.Model):
    id = models.AutoField(auto_created=True, unique=True, primary_key=True)

    purpose = models.CharField(max_length=40)
    description = models.CharField(max_length=100)
    amount = models.IntegerField(default=0)

    is_income = models.BooleanField(default=False)
    is_debt = models.BooleanField(default=False)
    is_weekly = models.BooleanField(default=True)
    is_monthly = models.BooleanField(default=False)
    debt_amount = models.IntegerField(default=0)

    date = models.DateField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.purpose} - {self.description[0:10]}... - {self.date}"

    class Meta:
        verbose_name = "Record"
        verbose_name_plural = "Records"
