import React from 'react';
import { ExpenseProvider } from './contexts/ExpenseContext';
import './styles/global.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ExpenseProvider>
      <Dashboard/>
    </ExpenseProvider>
  );
}

export default App;