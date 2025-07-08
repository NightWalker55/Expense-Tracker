
import axios from 'axios';

const API_BASE_URL = 'https://expense-tracker-backend-1w1u.onrender.com/api';

export const getExpensesByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/daily_expense`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_expense`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete_expense/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };  