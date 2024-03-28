import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUtensils,
  FaGamepad,
  FaPlane,
  FaShoppingBag,
  FaUser,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "../../styles/styles.css";

const RecentTransactions = ({ transactions, handleEdit, handleDelete }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils />;
      case "Entertainment":
        return <FaGamepad />;
      case "Travel":
        return <FaPlane />;
      case "Shopping":
        return <FaShoppingBag />;
      default:
        return <FaUser />;
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentTransactions = transactions.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="transaction-container">
      <h2>Recent Transactions</h2>
      <ul>
        {currentTransactions.map((transaction, index) => (
          <li key={index} className="transaction-row">
            <div className="transaction-details">
              <div className="category-icon">
                <p className="transaction-title">
                  {getCategoryIcon(transaction.category)}&emsp;{" "}
                  {transaction.title}
                </p>
              </div>
              <p className="transaction-date">&emsp;{transaction.date}</p>
            </div>
            <div className="icon-buttons">
              <p className="transaction-amount">&#8377;{transaction.amount}</p>
              <button onClick={() => handleEdit(firstIndex + index)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(firstIndex + index)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <div className="pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            <FaArrowLeft />
          </button>
          <p>Page {currentPage}</p>
          <button
            disabled={lastIndex >= transactions.length}
            onClick={handleNextPage}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
