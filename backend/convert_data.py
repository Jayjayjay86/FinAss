import json
from datetime import datetime

file_1 = "./latest-data.json"
file_2 = "./latest-data_clean.json"
file_3 = "./latest-data_final.json"


def process_json_further(input_file, output_file):
    with open(input_file, "r") as f:
        data = json.load(f)

    for i, entry in enumerate(data["expense_details"]):
        # check purposes
        entry["created"] = datetime.strptime(entry["created"], "%Y/%m/%d").strftime(
            "%Y-%m-%d"
        )
        entry["date"] = datetime.strptime(entry["date"], "%Y/%m/%d").strftime(
            "%Y-%m-%d"
        )
        if entry["purpose"] == "classes":
            entry["is_income"] = True
        elif (
            entry["purpose"] == "credit card 2"
            or entry["purpose"] == "credit card 1"
            or entry["purpose"] == "car loan"
        ):
            entry["is_debt"] = True
            entry["is_monthly"] = True
        elif entry["purpose"] == "cuttings" and entry["description"] == "cj grower":
            entry["is_income"] = True
        # check descriptions
        if entry["description"] == "rent":
            entry["is_monthly"] = True
        elif entry["description"] == "electric bill":
            entry["is_monthly"] = True
        elif entry["description"] == "water bill":
            entry["is_monthly"] = True
        elif entry["description"] == "petrol":
            entry["is_monthly"] = True
        elif entry["description"] == "dog food":
            entry["is_monthly"] = True
        # check keywords
        if "groceries" in entry["description"]:
            entry["is_monthly"] = True
        if "eggs" in entry["description"]:
            entry["is_monthly"] = True

    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)


def clean_json(input_file, output_file):
    with open(input_file, "r") as f:
        data = json.load(f)

    for i, entry in enumerate(data["expense_details"]):
        # Remove the brackets and inner speech from the purpose field and split multiple purposes
        purposes = (
            entry["purpose"]
            .replace("[", "")
            .replace("]", "")
            .replace("'", "")
            .split(",")
        )

        # Keep the first purpose and assign it to the entry
        entry["purpose"] = purposes[0].strip()

        # Change the id to the index (1-indexed)
        entry["id"] = i + 1

    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)


# clean_json(input_file=file_1, output_file=file_2)


process_json_further(input_file=file_2, output_file=file_3)
