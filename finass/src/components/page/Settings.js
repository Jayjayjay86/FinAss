import React, { useState } from "react";
import "./page-css/settings.css";
import Modal from "react-modal";
const Settings = ({ currentExpenses, useCustomNavigation }) => {
  console.log("current expenses", currentExpenses);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const { goToMenu } = useCustomNavigation();

  // Function to handle loading JSON file and creating expenses if they don't exist
  const handleLoadJSON = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log(jsonData);
        // Check if the JSON data contains an 'expense_details' key with an array value
        if (
          jsonData.hasOwnProperty("expense_details") &&
          Array.isArray(jsonData.expense_details)
        ) {
          const expensesArray = jsonData.expense_details;
          if (expensesArray.length === 0) {
            // Show a message if no expenses were found in the JSON file
            alert("No expenses found in the JSON file.");
            return;
          }

          // Loop through the expenses data
          for (const expense of expensesArray) {
            // Check if the expense already exists in the database
            const isExpenseExist = await checkExpenseExist(expense);
            console.log("existence", isExpenseExist);
            console.log(expense.date);
            if (!isExpenseExist) {
              // Create the expense if it doesn't exist
              await createExpense(expense);
            }
          }

          alert("JSON file loaded successfully!");
        } else {
          // Show an error message if the JSON data does not contain expense_details
          alert(
            "The JSON file does not contain 'expense_details' property with expenses data."
          );
        }
      } catch (error) {
        // Show an error message if there's an issue parsing the JSON
        alert("Error loading JSON file. Please check the file format.");
      }
    };

    reader.readAsText(file);
  };

  // Function to check if an expense already exists in the database
  const checkExpenseExist = (expense) => {
    const { purpose, description, date, amount } = expense;
    console.log("checked expense", expense);
    const isExpenseExist = currentExpenses.some(
      (currentExpense) =>
        currentExpense.purpose === purpose &&
        currentExpense.description === description &&
        currentExpense.date === date &&
        currentExpense.amount === amount
    );
    return isExpenseExist;
  };

  // Function to create an expense in the database

  const createExpense = async (expense) => {
    try {
      const response = await fetch("http://localhost:8000/expense/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token YOUR_AUTH_TOKEN", // Replace with your actual token
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        // Expense added successfully, handle the response here if needed
        console.log("Expense added successfully");
        alert("Expense added successfully!");
      } else {
        // Error adding the expense, handle the error here if needed
        console.error(
          "Error while adding expense:",
          response.status,
          response.statusText
        );
      }
      // You can add any additional handling or state updates here, if needed
    } catch (error) {
      console.error("Error while adding expense:", error);
    }
  };

  // Function to handle deleting all expenses
  const handleClearAllExpenses = () => {
    // Show the clear modal window to confirm action
    setShowClearModal(true);
  };

  // Function to clear all expenses if user confirms
  const handleClearConfirmation = async () => {
    try {
      const response = await fetch("http://localhost:8000/expenses/clear/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token YOUR_AUTH_TOKEN", // Replace with your actual token
        },
      });

      if (response.ok) {
        // Expenses cleared successfully, handle the response here if needed
        console.log("Expenses cleared successfully");
        alert("Expense cleared successfully!");
        // You can add any additional handling or state updates here, if needed
      } else {
        // Error clearing the expenses, handle the error here if needed
        console.error(
          "Error while clearing expenses:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while clearing expenses:", error);
    }

    // Close the clear modal window
    setShowClearModal(false);

    // Show a success message to the user
    alert("All expenses deleted successfully!");
  };
  const handleBackupToJSON = async () => {
    // Show the backup modal window to confirm action
    setShowBackupModal(true);
  };
  // Function to handle backing up expenses to JSON
  const handleBackupConfirmation = async () => {
    try {
      const response = await fetch("http://localhost:8000/expenses/backup/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token YOUR_AUTH_TOKEN", // Replace with your actual token
        },
      });

      if (response.ok) {
        // Backup successful, handle the response here if needed
        console.log("Backup successful");

        // Close the backup modal window
        setShowBackupModal(false);

        // Show a success message to the user
        alert("Expense data backed up!");
      } else {
        // Error in backup, handle the error here if needed
        console.error(
          "Error while backing up expenses:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while backing up expenses:", error);
    }
  };
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="input-section">
        <p>
          Select a json file below formatted with expense_details as the name of
          the array containing the expense data.
        </p>
        <input type="file" onChange={handleLoadJSON} />
      </div>
      <hr></hr>
      <div className="delete-section">
        <button className="delete" onClick={handleClearAllExpenses}>
          Delete All Expenses
        </button>
      </div>
      <div className="backup-section">
        <button className="backup" onClick={handleBackupToJSON}>
          Backup to JSON
        </button>
      </div>
      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onRequestClose={() => setShowClearModal(false)}
        contentLabel="Clear Confirmation Modal"
      >
        <p>Are you sure you want to delete all expenses?</p>
        <div className="modal-buttons">
          <button onClick={() => setShowClearModal(false)}>Cancel</button>
          <button onClick={handleClearConfirmation}>Confirm</button>
        </div>
      </Modal>

      {/* Backup Confirmation Modal */}
      <Modal
        isOpen={showBackupModal}
        onRequestClose={() => setShowBackupModal(false)}
        contentLabel="Backup Confirmation Modal"
      >
        <p>Are you sure you want to backup expenses to JSON?</p>
        <div className="modal-buttons">
          <button onClick={() => setShowBackupModal(false)}>Cancel</button>
          <button onClick={handleBackupConfirmation}>Confirm</button>
        </div>
      </Modal>
      <hr></hr>
      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default Settings;
