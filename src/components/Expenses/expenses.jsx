import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./expenses.css";
import "../../styles/styles.css";

const Expenses = ({ handleAddExpense, totalExpenses }) => {
  return (
    <div className="container">
      <h3>Expenses</h3>
      <p className="tag-p">&#8377;{totalExpenses}</p>
      <button className="expense-button" onClick={handleAddExpense}>
        <AiOutlinePlus /> Add Expense
      </button>
    </div>
  );
};

export default Expenses;
