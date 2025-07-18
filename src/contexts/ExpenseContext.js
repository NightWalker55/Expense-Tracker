import { createContext, useContext, useState, useEffect } from 'react';
import { getExpensesByDate, addExpense, updateExpense, deleteExpense, getAllExpenses } from '../api/expenseApi';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allExpense,setAllExpense] = useState([])

  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};


  const fetchExpenses = async (date) => {
    setIsLoading(true);
    try {
      const res = await getExpensesByDate(formatDate(date));
      setExpenses(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch expenses');
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllExpense = async () =>{
    setIsLoading(true);
    try {
      const res = await getAllExpenses();
      console.log(res)
      setAllExpense(res || []);
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch expenses');
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense({
        ...expense,
        date: formatDate(selectedDate),
      });
      await fetchExpenses(selectedDate);
      await fetchAllExpense();

    } catch (err) {
      setError(err.message || 'Failed to add expense');
    }
  };

  const handleUpdateExpense = async (id, updatedFields) => {
    try {
      const res = await updateExpense(id, updatedFields); 
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? res.data || res : exp))
      );
      await fetchAllExpense();
    } catch (err) {
      setError(err.message || 'Failed to update expense');
    }
  };
  

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      await fetchAllExpense();
    } catch (err) {
      setError(err.message || 'Failed to delete expense');
    }
  };

  useEffect(() => {
    fetchExpenses(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchAllExpense();
  }, []); 

  return (
    <ExpenseContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        expenses,
        allExpense,
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
