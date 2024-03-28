import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../../styles/styles.css";

const PieChartComponent = ({ expenses }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");

    if (!expenses || expenses.length === 0) {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["No Data"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["gray"],
            },
          ],
        },
        options: {},
      });
    } else {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Food", "Travel", "Shopping", "Entertainment", "Other"],
          datasets: [
            {
              label: "Expenses",
              data: [
                expenses.reduce(
                  (acc, expense) =>
                    expense.category === "Food"
                      ? acc + parseFloat(expense.price)
                      : acc,
                  0
                ),
                expenses.reduce(
                  (acc, expense) =>
                    expense.category === "Travel"
                      ? acc + parseFloat(expense.price)
                      : acc,
                  0
                ),
                expenses.reduce(
                  (acc, expense) =>
                    expense.category === "Shopping"
                      ? acc + parseFloat(expense.price)
                      : acc,
                  0
                ),
                expenses.reduce(
                  (acc, expense) =>
                    expense.category === "Entertainment"
                      ? acc + parseFloat(expense.price)
                      : acc,
                  0
                ),
                expenses.reduce(
                  (acc, expense) =>
                    expense.category === "Other"
                      ? acc + parseFloat(expense.price)
                      : acc,
                  0
                ),
              ],
              backgroundColor: ["red", "blue", "yellow", "green", "purple"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          color: "white",
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div>
      <div>
        <canvas
          ref={chartContainer}
          id="topExpensesChart"
          width="300"
          height="300"
        ></canvas>
      </div>
    </div>
  );
};

export default PieChartComponent;
