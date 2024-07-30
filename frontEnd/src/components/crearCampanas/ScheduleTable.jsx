import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

const ScheduleTable = ({ startTime, endTime, startDay, endDay, handleHorarioChange }) => {
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  const columns = useMemo(
    () => [
      { Header: 'Time', accessor: 'time' },
      { Header: 'Lunes', accessor: 'lunes' },
      { Header: 'Martes', accessor: 'martes' },
      { Header: 'Miercoles', accessor: 'miercoles' },
      { Header: 'Jueves', accessor: 'jueves' },
      { Header: 'Viernes', accessor: 'viernes' },
      { Header: 'Sabado', accessor: 'sabado' },
      { Header: 'Domingo', accessor: 'domingo' },
    ],
    []
  );

  const generateTimeSlots = (start, end, startDay, endDay) => {
    const timeSlots = [];
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);

    const startDate = new Date(startDay);
    const endDate = new Date(endDay);

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const row = { time };

      daysOfWeek.forEach((day, index) => {
        const currentDayOfWeek = new Date(startDate);
        currentDayOfWeek.setDate(currentDayOfWeek.getDate() + (index - startDate.getDay()));

        const isWithinRange = currentDayOfWeek >= startDate && currentDayOfWeek <= endDate;

        row[day] = isWithinRange ? false : 'X';
      });

      timeSlots.push(row);
    }

    return timeSlots;
  };

  const [data, setData] = useState(() => generateTimeSlots(startTime, endTime, startDay, endDay));

  useEffect(() => {
    setData(generateTimeSlots(startTime, endTime, startDay, endDay));
  }, [startTime, endTime, startDay, endDay]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const toggleCell = (rowIndex, columnId) => {
    if (data[rowIndex][columnId] === 'X') return;
    const newData = data.map((row, index) => 
      index === rowIndex 
        ? { ...row, [columnId]: !row[columnId] } 
        : row
    );
    setData(newData);
    handleHorarioChange(newData);
  };

  return (
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.id === 'time') {
                  return (
                    <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                      {cell.render('Cell')}
                    </td>
                  );
                }
                return (
                  <td
                    {...cell.getCellProps()}
                    onClick={() => toggleCell(row.index, cell.column.id)}
                    style={{
                      border: '1px solid black',
                      padding: '6px',
                      backgroundColor: cell.value === 'X' ? '#d3d3d3' : cell.value ? '#90EE90' : 'white',
                      cursor: cell.value === 'X' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {cell.value === 'X' ? 'X' : cell.value ? '✓' : ''}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
