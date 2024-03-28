import React from 'react';

const WalletBalance = ({ balance, handleAddIncome }) => {
  return (
    <div>
      <h2>Wallet Balance: {balance}</h2>
      <button onClick={handleAddIncome}>Add Income</button>
    </div>
  );
}

export default WalletBalance;
