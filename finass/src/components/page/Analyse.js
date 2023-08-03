import React from "react";
import PieChartPurpose from "./analysis-charts/PieChartPurpose";
import ExpenseSummary from "./analysis-charts/ExpenseSummary";
import PieChartIncome from "./analysis-charts/PieChartIncome";
import PieChartMonthly from "./analysis-charts/PieChartMonthly";
import LineChart from "./analysis-charts/LineChart";
import "./page-css/analyse.css";

const Analysis = ({ useCustomNavigation, expenses }) => {
  const { goToMenu } = useCustomNavigation();
  console.log(expenses);
  return (
    <div className="analysis-container">
      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>

      <div className="analysis-summary">
        <ExpenseSummary expenses={expenses} />
      </div>

      <div className="analysis-pie-income">
        <PieChartIncome expenses={expenses} />
      </div>
      <div className="analysis-pie-purpose">
        <PieChartPurpose expenses={expenses} />
      </div>
      <div className="analysis-pie-monthly">
        <PieChartMonthly expenses={expenses} />
      </div>
      <div className="analysis-line">
        <LineChart expenses={expenses} />
      </div>
      <div className="back-button">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default Analysis;
