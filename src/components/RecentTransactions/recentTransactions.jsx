import React from 'react';

const RecentTransactions = ({ transactions, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Category: {transaction.category}</p>
            <p>Date: {transaction.date}</p>
            <p>Amount: ${transaction.amount}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTransactions;
