import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';

import './AdminCampanaModal.css';
const formatHour = (hour) => {
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour} ${period}`;
};

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  } else {
    return 'Invalid date';
  }
}

function translateStatus(status) {
  console.log(typeof(status));
  if (status === 0) {
    return "Rechazado";
  }

  if (status === 1) {
    return "En revision";   
  }

  if (status === 2) {
    return "Pendiente de pago";
  }

  if (status === 3) {
    return "Aceptada";
  }

  if (status === 4) {
    return "Activa";
  }

  if (status === 5) {
    return "Finalizada";
  }

  return "Error en el estatus";
}

function AdminCampanaModal({ isOpen, onClose, campana, status }) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  let currentPanelPhoto;

  if (campana.id_pantalla === 1) {
    currentPanelPhoto = Panel220Photo;
  } else if (campana.id_pantalla === 2) {
    currentPanelPhoto = Panel302Photo;
  } else if (campana.id_pantalla === 3) {
    currentPanelPhoto = Panel410Photo;
  } else {
    currentPanelPhoto = Panel220Photo;
  }

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const url = `http://localhost:3000/api/campanas/getHorariosCampana/${campana.id_campaña}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las reservaciones');
        }

        const data = await response.json();
        setHorarios(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    if (isOpen) {
      fetchHorarios();
    }
  }, [isOpen, campana.id_campaña]);

  const daysOfWeek = useMemo(() => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], []);

  const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const parseHour = (timeString) => {
    return parseInt(timeString.split(':')[0], 10);
  };

  const data = useMemo(() => {
    const startHour = parseHour(campana.hora_inicio);
    const endHour = parseHour(campana.hora_fin);
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

    return hours.map(hour => {
      const row = { hour: formatHour(hour) };
      daysOfWeek.forEach((_, dayIndex) => {
        row[dayIndex + 1] = horarios.some(horario => horario.day === dayIndex + 1 && horario.hours.includes(hour)) ? '●' : '○';
      });
      return row;
    });
  }, [horarios, daysOfWeek, campana]);

  const columns = useMemo(() => {
    const cols = [
      { Header: 'Hora/Día', accessor: 'hour' },
      ...daysOfWeek.map((day, index) => ({
        Header: day,
        accessor: (index + 1).toString()
      }))
    ];
    return cols;
  }, [daysOfWeek]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (!isOpen) {
    return null;
  }

  console.log(campana);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>{campana.nombre_campaña}</h2>
            <p>Pantalla: {campana.nombre_pantalla}</p>

            <div className="modal-info">
              <img src={currentPanelPhoto} alt="imagen de panel" className='campaña-panel-image'/>
              <div className="modal-text-data">
                <p><b>Referencia campaña:</b> {/*campana.usuario*/} añadir referencia cuando se agregue</p>
                <p><b>Usuario:</b> {campana.usuario}</p>
                <p><b>Dirección de Pantalla:</b> {campana.direccion_pantalla}</p>
                <p><b>Fecha de Inicio:</b> {formatDate(campana.fecha_inicio)}</p>
                <p><b>Fecha de Fin:</b> {formatDate(campana.fecha_fin)}</p>
                <p><b>Estado:</b> {translateStatus(status)}</p>
              </div>
            </div>

            <div className="schedule-table">
              <table {...getTableProps()} className="table">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="header-row">
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="header-cell">{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="body">
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="body-row">
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="body-cell">{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCampanaModal;