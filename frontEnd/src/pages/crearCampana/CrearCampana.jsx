import React, { useState, useEffect } from "react";
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import DaySelector from "../../components/crearCampanas/DaySelector"
import SimboloAdvertencia from "../../assets/SimboloAdvertencia.svg"

import './CrearCampana.css';

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth()
  const day = date.getDay();
  return `${year}-${month}-${day}`; // Formatear la fecha como YYYY-MM-DD
}

function CrearCampanas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  //const [horario, setHorario] = useState([]);
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);
  const [dateRangeSelectorKey, setDateRangeSelectorKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  //const [cotizacion, setCotizacion] = useState(0);

  // function calculateCotiacion() {
  //   if (!fechaInicio || !fechaFin || !horario) {
  //     setCotizacion(0);
  //     return;
  //   }

  //   const horariosArray = Object.values(horario);
  //   let numberSpots = 0;

  //   for (let i = 0; i < horariosArray.length; i++) {
  //     const hourSelectedDays = Object.values(horariosArray[i]);

  //     for (let j = 0; j < hourSelectedDays.length; j++) {
  //       if (typeof(hourSelectedDays[j]) !== 'string' && hourSelectedDays[j] === true) {
  //         numberSpots++;
  //       }
  //     }
  //   }

  //   const difference = fechaInicio.getTime() - fechaFin.getTime();
  //   const duracion = Math.abs(difference / (1000 * 60 * 60 * 24)) + 1;
  
  //   setCotizacion(numberSpots * duracion * 4);
  // };

  // function handleHorarioChange(newHorario) {
  //   setHorario(newHorario);
  // }

  function calculatebudget() {
    if (!pantallaSeleccionada || !fechaInicio || !fechaFin || !days || !hours) {

      return 0;
    }

    return 1;
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
        const url = import.meta.env.VITE_API_URL + `/api/pantallas`;
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

    setDateRangeSelectorKey(Date.now());
    console.log(dateRangeSelectorKey);
    fetchPantallasData();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //const scheduleTableKey = `${pantallaSeleccionada?.id_pantalla}-${fechaInicio || 'no-fechaInicio'}-${fechaFin || 'no-fechaFin'}`;

  console.log(fechaInicio);

  return (
    <div className="creacion-campana-container">
      <div className="edicion-campana-container">
        <h3>Pantallas</h3>
        <div>
          <CampanaSelection 
            pantallas={pantallas}
            pantallaSeleccionada={pantallaSeleccionada}
            handlePantallaSelecionadaChange={handlePantallaSelecionadaChange}
          />
        </div>
        {pantallaSeleccionada && (
          <>
            <h3>Fechas</h3>
            <div>
              <DateRangeSelector 
                key={dateRangeSelectorKey}
                handleFechasChange={handleFechasChange}
              />
            </div>
            <h3>Días</h3>
            <div>
              <DaySelector/>
            </div>
            <h3>Horarios</h3>
            <div>
          	  <select name="" id="">
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <h3>Arte</h3>
            <div>
              <p>Lugar para subir las cosas </p>
            </div>
          </>
        )}
      </div>
      <div className="cotizacion-campana-container">
        <div>
          <img src={SimboloAdvertencia} alt="simbolo de advertencia" />
          <p>Arte bajo revisión por términos aceptados</p>
        </div>
        
        <p>$4 pesos por hora</p>
        <p>$ {calculatebudget} pesos</p>
        <button>solicitar fechas</button>
      </div>
    </div>
  );
}

export default CrearCampanas;
