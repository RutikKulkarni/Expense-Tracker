import React, { useState } from "react";

const EditTransactions = ({ transaction, handleCancel, handleSave }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    ...transaction,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(editedTransaction);
  };

  return (
    <div>
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            name="category"
            value={editedTransaction.category}
            onChange={handleChange}
          >
            <option disabled selected>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={editedTransaction.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={editedTransaction.amount}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTransactions;
