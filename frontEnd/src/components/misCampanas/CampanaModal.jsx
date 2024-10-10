import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import html2pdf from 'html2pdf.js';

import './CampanaModal.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  } else {
    return 'Invalid date';
  }
}

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const parseHour = (timeString) => {
  return parseInt(timeString.split(':')[0], 10);
};

function translateStatus(status) {
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

function CampanaModal({ isOpen, onClose, campana, status }) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${campana.ruta_arte}`;

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + `/api/campanas/getHorariosCampana/${campana.id_campaña}`;
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

  function handleDownload() {
    const element = document.querySelector('.modal-capture');
    
    const options = {
      margin: [10, 10, 10, 10],
      filename: `comprobante ${campana.nombre_pantalla}.pdf`,
      image: { type: 'jpeg', quality: 0.20 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='modal-capture'>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif' }}>{campana.nombre_campaña}</h2>
            <div className="modal-info">
              <img src={imageUrl} alt="imagen de panel" className='campaña-panel-image'/>
              <div className="modal-text-data">
                <div>
                  <p><b>Pantalla:</b> {campana.nombre_pantalla}</p>
                  <p><b>Referencia pago:</b> {campana.id_campaña}</p>
                  <p><b>Precio: </b>${campana.costo}</p>
                  <p><b>Dirección de Pantalla:</b> {campana.direccion_pantalla}</p>
                  <p><b>Fecha de Inicio:</b> {formatDate(campana.fecha_inicio)}</p>
                  <p><b>Fecha de Fin:</b> {formatDate(campana.fecha_fin)}</p>
                  <p><b>Estado:</b> {translateStatus(campana.estatus)}</p>
                </div>
                <button className='campana-modal-download-ticket-button' onClick={handleDownload}>Descargar comprobante</button>
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
            <div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif' }}>Cómo Pagar Mi Campaña</h2>

              <h3 style={{ fontFamily: 'Montserrat, sans-serif' }}>Paso 1</h3>
              <p>Realiza una transferencia bancaria de <span>{campana.costo} pesos</span> a la siguiente cuenta:</p>
              <div>
                <p><strong>Banco:</strong> BBVA</p>
                <p><strong>Número de cuenta:</strong> 0116391362</p>
                <p><strong>CLABE:</strong> 012580001163913622</p>
              </div>

              <h3 style={{ fontFamily: 'Montserrat, sans-serif' }}>Paso 2</h3>
              <p>En el concepto de la transferencia, escribe tu número de referencia: "{campana.id_campaña}".</p>

              <h3 style={{ fontFamily: 'Montserrat, sans-serif' }}>Paso 3</h3>
              <p>Envía el comprobante de pago a <span>hola@cerocinco.media</span> para validar tu transacción.</p>
              <p>Si necesitas ayuda, no dudes en contactarnos a través de nuestro servicio de atención al cliente.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampanaModal;