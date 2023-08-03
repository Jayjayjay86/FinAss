# Generated by Django 4.1.1 on 2023-08-01 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ExpenseRecord",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("purpose", models.CharField(max_length=40)),
                ("description", models.CharField(max_length=100)),
                ("amount", models.PositiveIntegerField(default=0)),
                ("is_income", models.BooleanField(default=False)),
                ("is_debt", models.BooleanField(default=False)),
                ("is_weekly", models.BooleanField(default=True)),
                ("is_monthly", models.BooleanField(default=False)),
                ("debt_amount", models.PositiveIntegerField(default=0)),
                ("date", models.DateField()),
                ("created", models.DateField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Record",
                "verbose_name_plural": "Records",
            },
        ),
    ]
