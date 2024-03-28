import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TopExpenses = ({ expenses }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Other'],
        datasets: [{
          label: 'Expenses',
          data: [
            // Get the total expenses for each category
            expenses.reduce((acc, expense) => expense.category === 'Food' ? acc + parseFloat(expense.price) : acc, 0),
            expenses.reduce((acc, expense) => expense.category === 'Travel' ? acc + parseFloat(expense.price) : acc, 0),
            expenses.reduce((acc, expense) => expense.category === 'Shopping' ? acc + parseFloat(expense.price) : acc, 0),
            expenses.reduce((acc, expense) => expense.category === 'Entertainment' ? acc + parseFloat(expense.price) : acc, 0),
            expenses.reduce((acc, expense) => expense.category === 'Other' ? acc + parseFloat(expense.price) : acc, 0),
          ],
          backgroundColor: ['red','blue','yellow', 'green', 'purple'],
        }]
      },
      options: {
        indexAxis: 'y', // Switch the axis to vertical
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Category'
            }
          },
          x: {
            // Update labels
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div>
      <h2>Top Expenses</h2>
      <canvas ref={chartContainer} id="topExpensesChart" width="400" height="400"></canvas>
    </div>
  );
}

export default TopExpenses;
