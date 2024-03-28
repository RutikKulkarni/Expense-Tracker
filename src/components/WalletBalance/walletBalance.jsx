import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "../../styles/styles.css";

const WalletBalance = ({ balance, handleAddIncome }) => {
  return (
    <div className="container">
      <h3>Wallet Balance</h3>
      <p className="tag-p">&#8377;{balance}</p>
      <button className="wallet-button" onClick={handleAddIncome}>
        <AiOutlinePlus /> Add Income
      </button>
    </div>
  );
};

export default WalletBalance;
