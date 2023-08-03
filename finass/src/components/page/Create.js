import React, { useState } from "react";
import "./page-css/create.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./page-css/create.css";
const Create = ({ useCustomNavigation }) => {
  const { goToMenu } = useCustomNavigation();
  const [formData, setFormData] = useState({
    purpose: "",
    amount: 0,
    description: "",
    is_monthly: false,
    is_income: false,
    is_debt: false,
    debt_amount: 0,
    is_weekly: false,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      purpose: formData.purpose,
      amount: formData.amount,
      description: formData.description,
      is_monthly: formData.is_monthly,
      is_income: formData.is_income,
      is_debt: formData.is_debt,
      debt_amount: formData.debt_amount,
      is_weekly: formData.is_weekly,
      date: formData.date,
    };
    console.log(newExpense);
    try {
      const response = await fetch("http://localhost:8000/expense/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token YOUR_AUTH_TOKEN", // Replace with your actual token
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        // Expense added successfully,
        toast.success("Expense added successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          style: {
            background: "#28a745", // Background color
            color: "#ffffff", // Text color
          },
        });
        setFormData({
          purpose: "",
          amount: 0,
          description: "",
          is_monthly: false,
          is_income: false,
          is_debt: false,
          debt_amount: 0,
          is_weekly: false,
          date: "",
        });
      } else {
        // Error adding the expense, handle the error here if needed
        console.error(
          "Error while adding expense:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while adding expense:", error);
    }
  };

  return (
    <div className="create-container">
      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>

      <div className="add-expense-heading">
        <h1>Add Expense</h1>
      </div>

      <form className="new-expense" onSubmit={handleSubmit}>
        <div className="create-form-item">
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-form-item">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-form-item">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-form-item">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-form-item">
          <label htmlFor="is_monthly">Is Monthly:</label>
          <input
            type="checkbox"
            id="is_monthly"
            name="is_monthly"
            checked={formData.is_monthly}
            onChange={handleChange}
          />
        </div>

        <div className="create-form-item">
          <label htmlFor="is_income">Is Income:</label>
          <input
            type="checkbox"
            id="is_income"
            name="is_income"
            checked={formData.is_income}
            onChange={handleChange}
          />
        </div>

        <div className="create-form-item">
          <label htmlFor="is_weekly">Is Weekly:</label>
          <input
            type="checkbox"
            id="is_weekly"
            name="is_weekly"
            checked={formData.is_weekly}
            onChange={handleChange}
          />
        </div>

        <div className="create-form-item">
          <label htmlFor="is_debt">Is Debt:</label>
          <input
            type="checkbox"
            id="is_debt"
            name="is_debt"
            checked={formData.is_debt}
            onChange={handleChange}
          />
        </div>

        {formData.is_debt && (
          <div className="create-form-item">
            <label htmlFor="debt_amount">Debt Amount:</label>
            <input
              type="number"
              id="debt_amount"
              name="debt_amount"
              value={formData.debt_amount}
              onChange={handleChange}
            />
          </div>
        )}
        <button className="add-expense" type="submit">
          Add Expense
        </button>
      </form>

      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default Create;
