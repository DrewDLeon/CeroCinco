import React, { useState, useMemo } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeSelector.css'; // If you have custom CSS

const DateRangeSelector = ({ onChange }) => {
  // Calculate the minimum selectable date (7 days from today)
  const minSelectableDate = useMemo(() => addDays(new Date(), 7), []);

  const [state, setState] = useState([
    {
      startDate: minSelectableDate,
      endDate: addDays(minSelectableDate, 7),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    if (onChange) {
      onChange(ranges.selection);
    }
  };

  // Spanish language configuration
  const spanishLocale = {
    localize: {
      day: n => ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][n],
      month: n => ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][n],
    },
    formatLong: {
      date: () => 'dd/MM/yyyy',
    },
  };

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
      rangeColors={['#3498db']}
    />
  );
};

export default DateRangeSelector;