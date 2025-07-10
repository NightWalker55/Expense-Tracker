import React, { useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Expenses.css';

export default function Expenses() {
  const { expenses, isLoading, deleteExpense, updateExpense } = useExpenses();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ expense_name: '', amount: 0 });


  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setFormData({
      expense_name: expense.expense_name,
      amount: expense.amount,
    });
  };
  

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ expense_name: '', amount: 0, date: new Date() });
  };

  const handleUpdateSubmit = async (id) => {
    try {
      await updateExpense(id, formData);
      setEditingId(null); 
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

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
            {editingId === expense.id ? (
              <div className="expense-edit-form">
              <input
                type="text"
                name="expense_name"
                value={formData.expense_name}
                onChange={handleInputChange}
                placeholder="Expense Name"
                className="edit-input"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                className="edit-input"
                min="0"
                step="0.01"
              />
              <div className="expense-actions edit-actions">
                <button className="save-button" onClick={() => handleUpdateSubmit(expense.id)}>
                  <FaSave /> Save
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
            
            ) : (
              <div className="expense-info">
                <h3>{expense.expense_name}</h3>
                <p>৳ {expense.amount}</p>
                <div className="expense-actions">
                  <button className="delete-button" onClick={() => deleteExpense(expense.id)}>
                    <FaTrashAlt /> Delete
                  </button>
                  <button className="update-button" onClick={() => handleEditClick(expense)}>
                    <FaEdit /> Update
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <h2 className="total-amount">Total: ৳ {total}</h2>
    </div>
  );
}


