import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import "./page-css/modal.css";
import "./page-css/list.css";
const List = ({ useCustomNavigation }) => {
  const { goToMenu } = useCustomNavigation();
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editFormData, setEditFormData] = useState({
    purpose: "",
    amount: 0,
    description: "",
    isIncome: false,
    isMonthly: false,
    isWeekly: false,
    isDebt: false,
    debt_amount: 0,
    date: "",
  });
  const [expandedExpenseId, setExpandedExpenseId] = useState(null);
  const bahtSign = "\u0E3F";
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8000/expenses/");
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();

      // Calculate the reversed IDs for the expenses
      const numExpenses = data.length;
      const updatedExpenses = data.map((expense, index) => ({
        ...expense,
        id: numExpenses - index,
      }));

      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (selectedExpense) {
      fetchExpenseData(selectedExpense.id);
    }
  }, [selectedExpense]);

  const fetchExpenseData = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/expenses/${expenseId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch expense data");
      }
      const data = await response.json();
      setEditFormData(data);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.purpose.toLowerCase().includes(search.toLowerCase()) ||
      expense.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEditModal = (expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (expense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:8000/expenses/${selectedExpense.id}/update/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsDeleteModalOpen(false);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/expenses/${selectedExpense.id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense");
      }
      setIsEditModalOpen(false);
      fetchExpenses();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleOpenDetails = (expenseId) => {
    setExpandedExpenseId((prevExpandedExpenseId) =>
      prevExpandedExpenseId === expenseId ? null : expenseId
    );
  };

  return (
    <div className="list-container">
      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search expenses..."
        />
      </div>
      <div className="expense-list-container">
        <ul className="expense-list">
          {filteredExpenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-item-card">
                <div className="expense-card-header">
                  <strong>Receipt {expense.id}</strong>
                </div>
                <div className="expense-card-body">
                  <div className="expense-card-left">
                    <div className="description-section">
                      <span>{expense.description.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="expense-card-right">
                    <div className="date-section">
                      <strong>Date:</strong>
                      <span>{expense.date}</span>
                    </div>
                    <div className="purpose-section">
                      <strong>Purpose:</strong>
                      <span>{expense.purpose}</span>
                    </div>

                    <div className="amount-section">
                      <strong>Amount:</strong>
                      <span>
                        {bahtSign}
                        {expense.amount}
                      </span>
                    </div>
                  </div>

                  <button
                    className="show-details-button"
                    onClick={() => handleOpenDetails(expense.id)}
                  >
                    {expandedExpenseId === expense.id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>

                  <div className="buttons-section">
                    <button onClick={() => handleOpenEditModal(expense)}>
                      <FiEdit className="edit" />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(expense)}>
                      <GoTrash className="delete" />
                    </button>
                  </div>
                  <div className="expense-card-bottom">
                    {/* Show additional details when the expand button is clicked */}
                    {expandedExpenseId === expense.id && (
                      <div className="expense-details">
                        <div className="detail-item">
                          <strong>Is Income:</strong>{" "}
                          {expense.is_income ? "Yes" : "No"}
                        </div>
                        <div className="detail-item">
                          <strong>Is Monthly:</strong>{" "}
                          {expense.is_monthly ? "Yes" : "No"}
                        </div>
                        <div className="detail-item">
                          <strong>Is Weekly:</strong>{" "}
                          {expense.is_weekly ? "Yes" : "No"}
                        </div>
                        <div className="detail-item">
                          <strong>Is Debt:</strong>{" "}
                          {expense.is_debt ? "Yes" : "No"}
                        </div>
                        {expense.is_debt && (
                          <div>
                            <strong>Debt Amount:</strong> {expense.debt_amount}
                          </div>
                        )}
                        {/* Add more additional details here if needed */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="back-button">
        <button onClick={goToMenu}>Go back to Menu</button>
      </div>

      <Modal
        className="modal"
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        contentLabel="Edit Expense"
        ariaHideApp={false}
      >
        <form className="new-expense" onSubmit={handleSaveEdit}>
          <div className="modal-form-item">
            <label htmlFor="purpose">Purpose:</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={editFormData.purpose}
              onChange={handleEditFormChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={editFormData.amount}
              onChange={handleEditFormChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              required
            />
          </div>
          {/* Additional fields for the expense attributes */}
          <div className="modal-form-item">
            <label htmlFor="isIncome">Is Income:</label>
            <input
              type="checkbox"
              id="isIncome"
              name="isIncome"
              checked={editFormData.isIncome}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="isMonthly">Is Monthly:</label>
            <input
              type="checkbox"
              id="isMonthly"
              name="isMonthly"
              checked={editFormData.isMonthly}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="isWeekly">Is Weekly:</label>
            <input
              type="checkbox"
              id="isWeekly"
              name="isWeekly"
              checked={editFormData.isWeekly}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="isDebt">Is Debt:</label>
            <input
              type="checkbox"
              id="isDebt"
              name="isDebt"
              checked={editFormData.isDebt}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="debt_amount">Debt Amount:</label>
            <input
              type="number"
              id="debt_amount"
              name="debt_amount"
              value={editFormData.debt_amount}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="button-container">
            <button type="submit">Save</button>
            <button onClick={handleCloseEditModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal
        className="modal"
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this expense?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={handleCloseDeleteModal}>No</button>
      </Modal>
    </div>
  );
};

export default List;
