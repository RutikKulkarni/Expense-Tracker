import React, { useState } from "react";
import "../../styles/styles.css";
const AddIncome = ({ handleCancel, handleAddBalance }) => {
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleChange = (e) => {
    setIncomeAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBalance(incomeAmount);
    setIncomeAmount("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <h2>Add Balance</h2>
          <label>
            <input
              type="number"
              value={incomeAmount}
              onChange={handleChange}
              placeholder="Income Amount"
              required
            />
          </label>
          <button type="submit">Add Balance</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
