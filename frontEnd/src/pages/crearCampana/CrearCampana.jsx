import React, { useState, useEffect } from "react";
import CalendarComponent from "../../components/rangeCalendar/RangeCalendar"; 
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import ScheduleTable from "../../components/crearCampanas/ScheduleTable"
import './CrearCampana.css';

function CrearCampanas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [horario, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cotizacion, setCotizacion] = useState(0);

  function calculateCotiacion() {
    if (!fechaInicio || !fechaFin || !horario) {
      setCotizacion(0);
      return;
    }

    const horariosArray = Object.values(horario);
    let numberSpots = 0;

    for (let i = 0; i < horariosArray.length; i++) {
      const hourSelectedDays = Object.values(horariosArray[i]);

      for (let j = 0; j < hourSelectedDays.length; j++) {
        if (typeof(hourSelectedDays[j]) !== 'string' && hourSelectedDays[j] === true) {
          numberSpots++;
        }
      }
    }

    const difference = fechaInicio.getTime() - fechaFin.getTime();
    const duracion = Math.abs(difference / (1000 * 60 * 60 * 24)) + 1;
  
    setCotizacion(numberSpots * duracion * 4);
  };

  function handleHorarioChange(newHorario) {
    setHorario(newHorario);
  }

  function handlePantallaSelecionadaChange(newPantalla) {
    setPantallaSeleccionada(newPantalla);
  }

  function handleFechasChange(newFechaInicio, newFechaFin) {
    setFechaInicio(newFechaInicio);
    setFechaFin(newFechaFin);
  }

  useEffect(() => {
    const fetchPantallasData = async () => {
      try {
        const url = `http://localhost:3000/api/pantallas`;
        const response = await fetch(url);
        const data = await response.json();
        setPantallas(data);
        if (data.length > 0) {
          setPantallaSeleccionada(data[0]); // Estableciendo una pantalla por defecto
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchPantallasData();
  }, [])

  useEffect(() => {
    setHorario([]);
  }, [pantallaSeleccionada]);

  useEffect(() => {
    setHorario([]);
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    calculateCotiacion();
  }, [horario]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const scheduleTableKey = `${pantallaSeleccionada?.id_pantalla}-${fechaInicio || 'no-fechaInicio'}-${fechaFin || 'no-fechaFin'}`;

  return (
    <div className="creacion-campana-container">
      <div className="edicion-campana-container">
        <div>
          <CampanaSelection 
            pantallas={pantallas}
            pantallaSeleccionada={pantallaSeleccionada}
            handlePantallaSelecionadaChange={handlePantallaSelecionadaChange}
          />
        </div>
        {pantallaSeleccionada && (
          <>
            <div>
              <DateRangeSelector 
                handleFechasChange={handleFechasChange}
              />
            </div>
            <div>
              <ScheduleTable 
                key={scheduleTableKey}
                startTime={pantallaSeleccionada.hora_inicio} 
                endTime={pantallaSeleccionada.hora_fin} 
                startDay={fechaInicio}
                endDay={fechaFin}
                handleHorarioChange={handleHorarioChange}
              />
            </div>
            <div>
              <h3>Lugar para subir las cosas</h3>
            </div>
          </>
        )}
      </div>
      <div className="cotizacion-campana-container">
        <p>Campaña sujeta a revision</p>
        <p>costo por spot: </p>
        <strong>Cotizacion</strong>
        <p>{cotizacion} pesos</p>
        <button>crear campana</button>
      </div>
    </div>
  );
}

export default CrearCampanas;
