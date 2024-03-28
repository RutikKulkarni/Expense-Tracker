import React from 'react';

const Expenses = ({ handleAddExpense, totalExpenses }) => {
  return (
    <div>
      <h2>Expenses: {totalExpenses}</h2>
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
}

export default Expenses;
