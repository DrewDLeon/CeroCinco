import React, { useState, useEffect } from "react";
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import MediaUpload from "../../components/crearCampanas/MediaUpload"
import SimboloAdvertencia from "../../assets/SimboloAdvertencia.svg"

import './CrearCampana.css';

function CrearCampanas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [days, setDays] = useState(Array(7).fill(-1));
  const [selectedHours, setSelectedHours] = useState([]);
  const [dateRangeSelectorKey, setDateRangeSelectorKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  //const [cotizacion, setCotizacion] = useState(0);

  function calculatebudget() {
    if (!pantallaSeleccionada || !fechaInicio || !fechaFin || !days || !selectedHours) {

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

  function toggleDay(index) {
    const newDays = [...days];
    newDays[index] = newDays[index] === 1 ? -1 : 1;
    setDays(newDays);
  }

  function generateTimeSlots(start, end) {
    const times = [];
    let currentTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
  
    while (currentTime <= endTime) {
      times.push(currentTime.toTimeString().slice(0, 5)); // Formato "HH:MM"
      currentTime.setHours(currentTime.getHours() + 1); // Incrementar en 1 hora
    }
  
    return times;
  }

  function toggleHour(hour) {
    const newSelectedHours = selectedHours.includes(hour)
      ? selectedHours.filter(h => h !== hour)
      : [...selectedHours, hour];
    setSelectedHours(newSelectedHours);
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

  const availableHours = pantallaSeleccionada ? generateTimeSlots(pantallaSeleccionada.hora_inicio, pantallaSeleccionada.hora_fin) : [];

  console.log(fechaInicio);
  console.log(fechaFin);
  console.log(days);
  console.log(pantallaSeleccionada);
  console.log(selectedHours);

  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <>
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
              <div className="days-container">
                {dayNames.map((day, index) => (
                  <div key={index}onClick={() => toggleDay(index)}
                    className={`day-selector ${days[index] === 1 ? 'selected' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <h3>Horarios</h3>
              <div>
                {availableHours.map(hour => (
                    <div key={hour}onClick={() => toggleHour(hour)}
                      className={`hour-selector ${selectedHours.includes(hour) ? 'selected' : ''}`}
                    >
                      {hour}
                    </div>
                  ))}
              </div>
              <h3>Arte</h3>
              <div>
                <MediaUpload pantallaSeleccionada={pantallaSeleccionada} />
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
    </>
  );
}

export default CrearCampanas;
