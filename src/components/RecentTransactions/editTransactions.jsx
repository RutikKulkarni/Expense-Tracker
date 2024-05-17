import React, { useState } from "react";
import "../../styles/styles.css";

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
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <select
              className="popup-inner input"
              name="category"
              value={editedTransaction.category}
              onChange={handleChange}
            >
              <option disabled selected>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Travel">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            <input
              className="popup-inner input"
              type="text"
              name="date"
              value={editedTransaction.date}
              onChange={handleChange}
              placeholder="Date (DD/MM/YYYY)"
              pattern="\d{2}/\d{2}/\d{4}"
              title="Please enter a date in the format DD/MM/YYYY"
              required
            />
          </label>
          <label>
            <input
              className="popup-inner input"
              type="number"
              name="amount"
              value={editedTransaction.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
          </label>
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTransactions;
