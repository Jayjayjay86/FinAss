import React from "react";
import { Pie } from "react-chartjs-2";
import chart from "chart.js/auto";

const PieChartPurpose = ({ expenses }) => {
  // Filter out the income entries from the expenses
  const expensesOnly = expenses.filter((expense) => !expense.is_income);

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
          "#FF7F50", // Coral
          "#90EE90", // Light Green
          "#FF69B4", // Hot Pink
          "#FFD700", // Gold
          "#3CB371", // Medium Sea Green
          "#FF1493", // Deep Pink
          "#FFA500", // Orange
          "#9370DB", // Medium Purple
          "#FFD750", // Lighter Gold
          "#9932CC", // Dark Orchid
          "#FF6347", // Tomato
          "#BA55D3", // Medium Orchid
          "#20B2AA", // Light Sea Green
          "#FF4500", // Orange Red
          "#40E009", // Turquoise
          "#DA70D6", // Orchid
          "#00FA9A", // Medium Spring Green
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
    <div>
      <h2>Yearly Breakdown</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartPurpose;
