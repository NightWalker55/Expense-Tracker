import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import MainLayout from '../components/Layout/MainLayout';
import Calendar from '../components/Calendar/Calendar';
import Expenses from '../components/Expenses/Expenses';

const Dashboard = () => {
  const { selectedDate, setSelectedDate, expenses, isLoading, error } = useExpenses();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <MainLayout
      calendar={<Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />}
      form={<ExpenseForm />}
    expenses={<Expenses/>}
    />
  );
};

export default Dashboard;