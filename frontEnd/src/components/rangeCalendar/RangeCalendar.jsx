import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RangeCalendar.css';

const RangeCalendar = () => {
  const [date, setDate] = useState([new Date(), new Date()]);

  const onChange = (selectedDate) => {
    if (Array.isArray(selectedDate)) {
      setDate(selectedDate);
    } else {
      const [start, end] = date;
      if (!start || (start && end)) {
        setDate([selectedDate, null]);
      } else {
        setDate([start, selectedDate]);
      }
    }
  };

  return (
    <div>
      <Calendar
        selectRange
        value={date}
        onChange={onChange}
      />
      <div>
        {date[0] && date[1] && (
          <p>
            Start: {date[0].toDateString()} - End: {date[1].toDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default RangeCalendar;
