import { createContext, useContext, useState, useEffect } from 'react';
import { getExpensesByDate, addExpense, updateExpense, deleteExpense } from '../api/expenseApi';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async (date) => {
    setIsLoading(true);
    try {
      const data = await getExpensesByDate(date.toISOString().split('T')[0]);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense({
        ...expense,
        date: selectedDate.toISOString().split('T')[0],
      });
      setExpenses([...expenses, newExpense]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      const data = await updateExpense(id, updatedExpense);
      setExpenses(expenses.map(exp => exp.id === id ? data : exp));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchExpenses(selectedDate);
  }, [selectedDate]);

  return (
    <ExpenseContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        expenses,
        isLoading,
        error,
        addExpense: handleAddExpense,
        updateExpense: handleUpdateExpense,
        deleteExpense: handleDeleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);