import React from 'react';
import './Total.css';
import { useExpenses } from '../../contexts/ExpenseContext';
import { FaWallet } from 'react-icons/fa';

function Total() {
  const { isLoading, allExpense } = useExpenses();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const total = allExpense.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="total-container">
      <div className="total-card">
        <FaWallet className="wallet-icon" />
        <div className="total-text">
          <h2 className="label">Total spent till date</h2>
          <h2 className="amount">৳ {total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Total;
