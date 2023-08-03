import React, { useState } from "react";
import { Line } from "react-chartjs-2";

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

const LineChart = ({ expenses }) => {
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

  // Assuming you have a list of unique purposes from your expenses data
  const uniquePurposes = [
    ...new Set(expensesOnly.map((expense) => expense.purpose)),
  ];

  // State to keep track of the selected purpose
  const [selectedPurpose, setSelectedPurpose] = useState("");

  // Filter expenses for the selected purpose
  const expensesForSelectedPurpose = expensesOnly.filter((expense) => {
    return selectedPurpose === "" || expense.purpose === selectedPurpose;
  });

  // Group expenses by month and calculate total expenses for each month
  const totalAmountByMonth = {};
  expensesForSelectedPurpose.forEach((expense) => {
    const date = new Date(expense.date);
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    if (!totalAmountByMonth[monthYear]) {
      totalAmountByMonth[monthYear] = expense.amount;
    } else {
      totalAmountByMonth[monthYear] += expense.amount;
    }
  });

  // Extract the labels (months) and amounts to use in the chart
  const labels = Object.keys(totalAmountByMonth);
  const amounts = Object.values(totalAmountByMonth);

  // Chart data and options
  const data = {
    labels,
    datasets: [
      {
        label: "Total Expenses",
        data: amounts,
        fill: false,
        borderColor: "#FF8C00",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time Period",
          color: "#333", // Title text color
        },
        grid: {
          display: true,
          borderColor: "#f0f0f0", // Grid line color
        },
        ticks: {
          color: "#333", // Tick label color
        },
        time: {
          tooltipFormat: "MMM yyyy", // Date tooltip format
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Total Expenses",
          color: "#333", // Title text color
        },
        grid: {
          display: true,
          borderColor: "#f0f0f0", // Grid line color
        },
        ticks: {
          color: "#333", // Tick label color
          beginAtZero: true, // Start the y-axis from zero
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Legend position
        labels: {
          color: "#333", // Legend label color
        },
      },
    },
  };

  // Event handler to update the selected purpose
  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  return (
    <div className="line-monthly">
      <h2>Monthly Expenses</h2>
      <label htmlFor="purposeSelect">Select Purpose: </label>
      <select
        id="purposeSelect"
        value={selectedPurpose}
        onChange={handlePurposeChange}
      >
        <option value="">All</option>
        {uniquePurposes.map((purpose) => (
          <option key={purpose} value={purpose}>
            {purpose}
          </option>
        ))}
      </select>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
