import React from 'react';
import { format, isSameDay } from 'date-fns';
import './Calendar.css';

const CalendarDay = ({ day, isCurrentMonth, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(day);
  };

  return (
    <div
      className={`calendar-day 
        ${isCurrentMonth ? 'current-month' : 'other-month'} 
        ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <span className="day-number">{format(day, 'd')}</span>
    </div>
  );
};

export default CalendarDay;