import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

import './Calendar.css';
import CalendarDay from './CalendarDay';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const currentMonth = selectedDate;
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {daysInMonth.map(day => (
          <CalendarDay
            key={day.toString()}
            day={day}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isSelected={isSameDay(day, selectedDate)}
            onSelect={onDateSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;