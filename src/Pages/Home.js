import React, { useState, useEffect } from 'react';
import WalletBalance from '../components/WalletBalance/walletBalance';
import AddIncome from '../components/WalletBalance/addIncome';
import Expenses from '../components/Expenses/expenses';
import AddExpenses from '../components/Expenses/addExpenses';
import RecentTransactions from '../components/RecentTransactions/recentTransactions';
import EditTransactions from '../components/RecentTransactions/editTransactions';
import TopExpenses from '../components/TopExpenses/topExpenses';
import PieChartComponent from '../components/PieChart/pieChart'; // Import PieChartComponent

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [editedTransactionIndex, setEditedTransactionIndex] = useState(null);

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedExpenses = localStorage.getItem('expenses');
    const storedRecentTransactions = localStorage.getItem('recentTransactions');
    const storedTotalExpenses = localStorage.getItem('totalExpenses');

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
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalExpenses', totalExpenses);
  }, [expenses, totalExpenses]);

  useEffect(() => {
    localStorage.setItem('recentTransactions', JSON.stringify(recentTransactions));
  }, [recentTransactions]);

  const handleAddIncome = () => {
    setShowAddIncome(true);
  };

  const handleAddBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + parseFloat(amount));
    setShowAddIncome(false);
  };

  const handleAddExpense = (expense) => {
    const expenseAmount = parseFloat(expense.price);
    setExpenses([...expenses, expense]);
    setBalance((prevBalance) => prevBalance - expenseAmount);
    setTotalExpenses((prevTotal) => prevTotal + expenseAmount);
    setShowAddExpense(false);

    const newTransaction = {
      category: expense.category,
      date: expense.date,
      amount: expenseAmount,
    };
    setRecentTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
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
      <h1>Expense Tracker</h1>
      <WalletBalance balance={balance} handleAddIncome={handleAddIncome} />
      {showAddIncome && <AddIncome handleCancel={handleCancel} handleAddBalance={handleAddBalance} />}
      <Expenses handleAddExpense={() => setShowAddExpense(true)} totalExpenses={totalExpenses} />
      {showAddExpense && <AddExpenses handleCancel={handleCancel} handleAddExpense={handleAddExpense} />}
      {showEditTransaction && (
        <EditTransactions
          transaction={recentTransactions[editedTransactionIndex]}
          handleCancel={handleCancel}
          handleSave={handleSaveTransaction}
        />
      )}
      <RecentTransactions
        transactions={recentTransactions}
        handleEdit={handleEditTransaction}
        handleDelete={handleDeleteTransaction}
      />
      <TopExpenses expenses={expenses} />
      <PieChartComponent expenses={expenses} />
    </div>
  );
};

export default Home;
