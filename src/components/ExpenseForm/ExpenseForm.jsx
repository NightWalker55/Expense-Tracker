import { useState } from "react";
import { useExpenses } from '../../contexts/ExpenseContext';
import './ExpenseForm.css';
import { FaMoneyBillWave, FaCalendarAlt, FaTag } from 'react-icons/fa'; 
import { BsEmojiNeutral } from "react-icons/bs";

const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const { selectedDate, addExpense } = useExpenses();

  const submitForm = (e) => {
    e.preventDefault();

    const formatLocalDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const finalDate = date || formatLocalDate(selectedDate);

    addExpense({
      expense_name: expenseName,
      amount: parseFloat(amount),
      date: finalDate,
    });

    setAmount("");
    setExpenseName("");
    setDate("");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Track Your Expenses</h1>
      <h2 className="form-subtitle">
        Add expenses for {selectedDate.toLocaleDateString('en-US', {
        
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h2>
      <form onSubmit={submitForm} className="expense-form">
        <div className="input-group">
          <label htmlFor="expenseName">
            <FaTag className="input-icon" />
            Expense
          </label>
          <input
            id="expenseName"
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Another Expense! 😐"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount">
            <FaMoneyBillWave className="input-icon" />
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="You need to save money"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="date">
            <FaCalendarAlt className="input-icon" />
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <button className="submit-btn" type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;