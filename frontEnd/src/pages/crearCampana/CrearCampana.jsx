import React, { useState, useEffect } from "react";
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import MediaUpload from "../../components/crearCampanas/MediaUpload"
import SimboloAdvertencia from "../../assets/SimboloAdvertencia.svg"
import axios from 'axios';

import './CrearCampana.css';

function CrearCampanas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [days, setDays] = useState(Array(7).fill(-1));
  const [selectedHours, setSelectedHours] = useState([]);
  const [dateRangeSelectorKey, setDateRangeSelectorKey] = useState(Date.now());
  const [files, setFiles] = useState([]);
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

  function handleFilesChange(newFiles) {
    setFiles(newFiles);
  }

  async function handleUpload() {
    if (files.length === 0) {
      alert("Por favor, selecciona al menos un archivo.");
      return;
    }
  
    const formData = new FormData();
    
    // Añadir cada archivo al FormData
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
  
    // Añadir otros datos necesarios
    formData.append('pantallaId', pantallaSeleccionada.id);
    formData.append('fechaInicio', fechaInicio.toISOString());
    formData.append('fechaFin', fechaFin.toISOString());
    formData.append('dias', JSON.stringify(days));
    formData.append('horas', JSON.stringify(selectedHours));
  
    // Imprimir el contenido del FormData en la consola
    console.log("Datos que se enviarían al backend:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, ':', {
          name: value.name,
          type: value.type,
          size: value.size + ' bytes'
        });
      } else {
        console.log(key, ':', value);
      }
    }
  
    // Aquí iría la lógica real de envío al backend cuando esté implementada
    console.log("Simulando envío al backend...");
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

  console.log("---------------------")
  console.log("Pantalla seleccionada");
  console.log(pantallaSeleccionada);
  console.log("Fecha Inicio");
  console.log(fechaInicio);
  console.log("Fecha fin");
  console.log(fechaFin);
  console.log("Dias");
  console.log(days);
  console.log("Horas");
  console.log(selectedHours);
  console.log("files");
  console.log(files);

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
                <MediaUpload 
                  pantallaSeleccionada={pantallaSeleccionada} 
                  onFilesChange={handleFilesChange}
                />
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
          <button onClick={handleUpload} >solicitar fechas</button>
        </div>
      </div>
    </>
  );
}

export default CrearCampanas;
