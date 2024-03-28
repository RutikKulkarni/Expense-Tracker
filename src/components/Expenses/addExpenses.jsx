import React, { useState } from "react";
import "./expenses.css";
import "../../styles/styles.css";

const AddExpenses = ({ handleCancel, handleAddExpense }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense({ title, price, category, date });
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </label>
          <label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </label>
          <label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Select Category"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date (DD/MM/YYYY)"
              pattern="\d{2}/\d{2}/\d{4}"
              title="Please enter a date in the format DD/MM/YYYY"
              required
            />
          </label>
          <button type="submit">Add Expense</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenses;
