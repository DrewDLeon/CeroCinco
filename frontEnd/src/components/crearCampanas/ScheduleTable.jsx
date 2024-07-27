import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

const ScheduleTable = ({ startTime, endTime, handleHorarioChange }) => {
  const columns = useMemo(
    () => [
      { Header: 'Time', accessor: 'time' },
      { Header: 'Monday', accessor: 'monday' },
      { Header: 'Tuesday', accessor: 'tuesday' },
      { Header: 'Wednesday', accessor: 'wednesday' },
      { Header: 'Thursday', accessor: 'thursday' },
      { Header: 'Friday', accessor: 'friday' },
      { Header: 'Saturday', accessor: 'saturday' },
      { Header: 'Sunday', accessor: 'sunday' },
    ],
    []
  );

  const generateTimeSlots = (start, end) => {
    const timeSlots = [];
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00:00`;
      timeSlots.push({
        time,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      });
    }

    return timeSlots;
  };

  const [data, setData] = useState(() => generateTimeSlots(startTime, endTime));

  useEffect(() => {
    setData(generateTimeSlots(startTime, endTime));
  }, [startTime, endTime]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const toggleCell = (rowIndex, columnId) => {
    const newData = data.map((row, index) => 
      index === rowIndex 
        ? { ...row, [columnId]: !row[columnId] } 
        : row
    );
    setData(newData);
    handleHorarioChange(newData);
    console.log(`Toggled ${columnId} at ${newData[rowIndex].time} to ${newData[rowIndex][columnId]}`);
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
                      backgroundColor: cell.value ? '#90EE90' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    {cell.value ? '✓' : ''}
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