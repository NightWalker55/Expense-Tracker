import React from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
          <motion.div
            className={`expense-card ${expense.amount > 1000 ? 'high-expense' : 'low-expense'}`}
            key={expense.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="expense-category-icon">💸</div>
            <div className="expense-info">
              <h3>{expense.expense_name}</h3>
              <p>৳ {expense.amount}</p>
              <div className="expense-actions">
                <button className="delete-button" onClick={() => deleteExpense(expense.id)}>
                  <FaTrashAlt /> Delete
                </button>
                <button className="update-button">
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="total-amount">Total: ৳ {total}</h2>
    </div>
  );
}
