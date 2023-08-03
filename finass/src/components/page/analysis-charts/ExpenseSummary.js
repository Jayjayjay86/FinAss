import React, { useState } from "react";

const bahtSign = "\u0E3F";
const ExpenseSummary = ({ expenses }) => {
  // Calculate total income and total outgoing for the year-to-date

  const currentYear = new Date().getFullYear();
  let totalIncome = 0;
  let totalOutgoing = 0;

  // Create a Set to store available months with expenses
  const availableMonths = new Set();

  expenses.forEach((expense) => {
    const { is_income, amount, date } = expense;
    const expenseYear = new Date(date).getFullYear();
    const expenseMonth = new Date(date).getMonth() + 1; // JavaScript months are 0-indexed, so we add 1

    if (expenseYear === currentYear) {
      if (is_income) {
        totalIncome += amount;
      } else {
        totalOutgoing += amount;
      }

      // Add the month to the Set of available months
      availableMonths.add(expenseMonth);
    }
  });

  // State to track the selected month
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January (1)

  // Function to update the selected month
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  // Filter expenses for the selected month
  const filteredExpenses = expenses.filter((expense) => {
    const expenseYear = new Date(expense.date).getFullYear();
    const expenseMonth = new Date(expense.date).getMonth() + 1; // JavaScript months are 0-indexed, so we add 1
    return expenseYear === currentYear && expenseMonth === selectedMonth;
  });

  // Calculate total income and total outgoing for the selected month
  let totalIncomeSelectedMonth = 0;
  let totalOutgoingSelectedMonth = 0;

  filteredExpenses.forEach((expense) => {
    const { is_income, amount } = expense;
    if (is_income) {
      totalIncomeSelectedMonth += amount;
    } else {
      totalOutgoingSelectedMonth += amount;
    }
  });

  return (
    <div className="summary">
      <h2>Expense Summary</h2>
      <p>
        Total Income (Year-to-Date): {bahtSign}
        {totalIncome.toFixed(2)}
      </p>
      <p>
        Total Outgoing (Year-to-Date): {bahtSign}
        {totalOutgoing.toFixed(2)}
      </p>
      <div className="summary-month-select">
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {[...availableMonths].map((month) => (
            <option key={month} value={month}>
              {new Date(currentYear, month - 1, 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      </div>
      <p>
        Total Income (Selected Month): {bahtSign}
        {totalIncomeSelectedMonth.toFixed(2)}
      </p>
      <p>
        Total Outgoing (Selected Month): {bahtSign}
        {totalOutgoingSelectedMonth.toFixed(2)}
      </p>
    </div>
  );
};

export default ExpenseSummary;
