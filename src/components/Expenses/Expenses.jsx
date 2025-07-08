import React from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import './Expenses.css';

export default function Expenses() {
  const { expenses, isLoading, deleteExpense } = useExpenses();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!expenses.length) {
    return (
      <div className="no-expenses">
        <div className="no-expenses-card">
          <h2>No expenses found</h2>
          <p>Looks like you didn’t spend anything on this day.</p>
          <p>🧘‍♀️ Good job staying frugal!</p>
        </div>
      </div>
    );
  }
  

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expenses-wrapper">

      <div className="expenses-container">
        {expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <div className="expense-info">
              <h3>{expense.expense_name}</h3>
              <p>৳ {expense.amount}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <h2 className="total-amount">Total: ৳ {total}</h2>
    </div>
  );
}
