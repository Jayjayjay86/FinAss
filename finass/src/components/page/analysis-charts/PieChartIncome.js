import React from "react";
import { Pie } from "react-chartjs-2";
import chart from "chart.js/auto";

const PieChart = ({ expenses }) => {
  // Filter out the income entries from the expenses
  const expensesOnly = expenses.filter((expense) => expense.is_income);
  // Group expenses by purpose and calculate total expenses for each purpose
  const totalAmountByPurpose = {};
  expensesOnly.forEach((expense) => {
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
          "#FF5733", // Tomato
          "#66CC11", // Sage Green
          "#FF1493", // Deep Pink
          "#FFD700", // Gold
          "#FFA500", // Orange
          "#8A2BE2", // Blue Violet
        ],
      },
    ],
  };

  const options = {
    legend: {
      position: "right",
    },
  };

  return (
    <div className="pie-income">
      <h2>Total Income</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
