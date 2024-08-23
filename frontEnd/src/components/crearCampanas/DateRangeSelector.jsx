import React, { useState, useMemo, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeSelector.css';

const DateRangeSelector = ({ onChange, handleFechasChange }) => {
  // Calculate the minimum selectable date (7 days from today)
  const minSelectableDate = useMemo(() => addDays(new Date(), 7), []);

  const [state, setState] = useState([
    {
      startDate: minSelectableDate,
      endDate: addDays(minSelectableDate, 0),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    handleFechasChange(ranges.selection.startDate, ranges.selection.endDate);
    setState([ranges.selection]);
    if (onChange) {
      onChange(ranges.selection);
    }
  };

  // useEffect(() => {
  //   handleFechasChange(startDate, endDate);
  // }, [])

  return (
    <DateRange
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={state}
      onChange={handleSelect}
      months={1}
      direction="horizontal"
      minDate={minSelectableDate}
      locale={es}
      dateDisplayFormat="dd/MM/yyyy"
      monthDisplayFormat="MMMM yyyy"
      weekdayDisplayFormat="EEEEEE"
      dayDisplayFormat="d"
      rangeColors={['#30EFA6']}
    />
  );
};

export default DateRangeSelector;