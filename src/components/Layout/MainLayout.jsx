import React from 'react';
import './MainLayout.css';

const MainLayout = ({ calendar, form, expenses }) => {
  return (
    <div className="app-container">
      <div className="sidebar">
        {calendar}
      </div>
      <div className="main-content">
        {form}
      </div>
      <div className="expenses-panel">
  {expenses}
</div>
    </div>
  );
};

export default MainLayout;