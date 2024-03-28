import React, { useState, useEffect } from "react";
import WalletBalance from "../components/WalletBalance/walletBalance";
import AddIncome from "../components/WalletBalance/addIncome";
import Expenses from "../components/Expenses/expenses";
import AddExpenses from "../components/Expenses/addExpenses";
import RecentTransactions from "../components/RecentTransactions/recentTransactions";
import EditTransactions from "../components/RecentTransactions/editTransactions";
import TopExpenses from "../components/TopExpenses/topExpenses";
import PieChartComponent from "../components/PieChart/pieChart";
import "./Home.css";

const Home = () => {
  const [balance, setBalance] = useState(5000); 
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [editedTransactionIndex, setEditedTransactionIndex] = useState(null);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedExpenses = localStorage.getItem("expenses");
    const storedRecentTransactions = localStorage.getItem("recentTransactions");
    const storedTotalExpenses = localStorage.getItem("totalExpenses");

    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }

    if (storedRecentTransactions) {
      setRecentTransactions(JSON.parse(storedRecentTransactions));
    }

    if (storedTotalExpenses) {
      setTotalExpenses(parseFloat(storedTotalExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalExpenses", totalExpenses);
  }, [expenses, totalExpenses]);

  useEffect(() => {
    localStorage.setItem(
      "recentTransactions",
      JSON.stringify(recentTransactions)
    );
  }, [recentTransactions]);

  const handleAddIncome = () => {
    setShowAddIncome(true);
  };

  const handleAddBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + parseFloat(amount));
    setShowAddIncome(false);
  };

  const handleAddExpense = (expense) => {
    const { title, price, category, date } = expense;
    const expenseAmount = parseFloat(price);

    if (expenseAmount > balance) {
      alert("You cannot spend more than your available balance!");
      return;
    }

    setExpenses([...expenses, { title, price, category, date }]);
    setBalance((prevBalance) => prevBalance - expenseAmount);
    setTotalExpenses((prevTotal) => prevTotal + expenseAmount);
    setShowAddExpense(false);

    const newTransaction = {
      category: category,
      date: date,
      amount: expenseAmount,
      title: title,
    };
    setRecentTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const handleCancel = () => {
    setShowAddIncome(false);
    setShowAddExpense(false);
    setShowEditTransaction(false);
    setEditedTransactionIndex(null);
  };

  const handleEditTransaction = (index) => {
    setShowEditTransaction(true);
    setEditedTransactionIndex(index);
  };

  const handleSaveTransaction = (editedTransaction) => {
    const updatedTransactions = [...recentTransactions];
    updatedTransactions[editedTransactionIndex] = editedTransaction;
    setRecentTransactions(updatedTransactions);

    const oldAmount = recentTransactions[editedTransactionIndex].amount;
    const newAmount = parseFloat(editedTransaction.amount);
    const balanceDiff = oldAmount - newAmount;
    setBalance((prevBalance) => prevBalance + balanceDiff);

    const newTotalExpenses = totalExpenses - oldAmount + newAmount;
    setTotalExpenses(newTotalExpenses);

    setShowEditTransaction(false);
    setEditedTransactionIndex(null);
  };

  const handleDeleteTransaction = (index) => {
    const deletedAmount = recentTransactions[index].amount;
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);

    const updatedTransactions = [...recentTransactions];
    updatedTransactions.splice(index, 1);
    setRecentTransactions(updatedTransactions);

    setBalance((prevBalance) => prevBalance + parseFloat(deletedAmount));
    setTotalExpenses((prevTotal) => prevTotal - parseFloat(deletedAmount));

    handleCancel();
  };

  return (
    <div>
      <div class="header">
        <div class="dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <h1>Expense Tracker</h1>
      </div>
      <div className="homecontainer">
        <WalletBalance balance={balance} handleAddIncome={handleAddIncome} />
        <Expenses
          handleAddExpense={() => setShowAddExpense(true)}
          totalExpenses={totalExpenses}
        />
        <PieChartComponent expenses={expenses} />
      </div>
      <div className="secrow">
        <div className="recent-transactions-container">
          <RecentTransactions
            transactions={recentTransactions}
            handleEdit={handleEditTransaction}
            handleDelete={handleDeleteTransaction}
            titles={expenses.map((expense) => expense.title)}
          />
        </div>
        <div className="graph-container">
          <TopExpenses expenses={expenses} />
        </div>
      </div>
      {showAddIncome && (
        <AddIncome
          handleCancel={handleCancel}
          handleAddBalance={handleAddBalance}
        />
      )}
      {showAddExpense && (
        <AddExpenses
          handleCancel={handleCancel}
          handleAddExpense={handleAddExpense}
        />
      )}
      {showEditTransaction && (
        <EditTransactions
          transaction={recentTransactions[editedTransactionIndex]}
          handleCancel={handleCancel}
          handleSave={handleSaveTransaction}
        />
      )}
    </div>
  );
};

export default Home;
