import React, { useState } from 'react';

const AddIncome = ({ handleCancel, handleAddBalance }) => {
  const [incomeAmount, setIncomeAmount] = useState('');

  const handleChange = (e) => {
    setIncomeAmount(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBalance(incomeAmount);
    setIncomeAmount('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Income Amount:
          <input type="number" value={incomeAmount} onChange={handleChange} required/>
        </label>
        <button type="submit">Add Balance</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddIncome;
