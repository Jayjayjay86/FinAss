import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import chart from "chart.js/auto";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PieChart = ({ expenses }) => {
  // Filter out the income entries from the expenses
  const expensesOnly = expenses.filter((expense) => !expense.is_income);
  // Get unique months from expenses data
  const uniqueMonths = [
    ...new Set(
      expensesOnly.map((expense) => {
        const date = new Date(expense.date);
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      })
    ),
  ];

  // State to keep track of the selected month
  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0]);

  // Filter expenses for the selected month
  const expensesForSelectedMonth = expensesOnly.filter((expense) => {
    const date = new Date(expense.date);
    return (
      `${monthNames[date.getMonth()]} ${date.getFullYear()}` === selectedMonth
    );
  });

  // Group expenses by purpose and calculate total expenses for each purpose
  const totalAmountByPurpose = {};
  expensesForSelectedMonth.forEach((expense) => {
    const { purpose, amount } = expense;
    if (!totalAmountByPurpose[purpose]) {
      totalAmountByPurpose[purpose] = amount;
    } else {
      totalAmountByPurpose[purpose] += amount;
    }
  });

  // Extract the purpose labels and amounts to use in the chart
  const labels = Object.keys(totalAmountByPurpose);
  const amounts = Object.values(totalAmountByPurpose);

  // Chart data and options
  const data = {
    labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: [
          "#FF8C00",
          "#7FFF00",
          "#DA70D6",
          "#00BFFF",
          "#FFD700",
          "#32CD32",
          "#FF1493",
          "#FFA500",
          "#800080",
          "#00FFFF",
          "#FFFF00",
          "#00FF00",
          "#9932CC",
          "#FF4500",
          "#40E0D0",
          "#8A2BE2",
          "#00FA9A",
        ],
      },
    ],
  };

  const options = {
    legend: {
      position: "right",
    },
  };

  // Event handler to update the selected month
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="pie-monthly">
      <h2>Monthly Breakdown</h2>
      <label htmlFor="monthSelect">Select Month: </label>
      <select
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {uniqueMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
