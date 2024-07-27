import React, { useState, useEffect } from "react";
import CalendarComponent from "../../components/rangeCalendar/RangeCalendar"; 
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import ScheduleTable from "../../components/crearCampanas/ScheduleTable"
import './CrearCampana.css';


function CrearCampañas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [horario, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("");
  console.log("");
  console.log("Pantallas: " + pantallas);
  console.log("Pantalla seleccionada: " + pantallaSeleccionada);
  console.log("Fecha de inicio: " + fechaInicio);
  console.log("Fecha de fin: " + fechaFin);
  console.log("Horario: " + horario);


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
              {/* <CalendarComponent 
                handleFechasChange={handleFechasChange}
              /> */}
              <DateRangeSelector />
            </div>
            <div>
              <ScheduleTable 
                startTime={pantallaSeleccionada.hora_inicio} 
                endTime={pantallaSeleccionada.hora_fin} 
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
        <p>1000 pesos</p>
        <button>crear campana</button>
      </div>
    </div>
  );
}

export default CrearCampañas;