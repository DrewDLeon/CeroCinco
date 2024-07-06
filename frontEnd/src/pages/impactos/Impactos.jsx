import React, { useState, useEffect } from "react";
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import StackedBarChart from '../../components/graphs/StackedBarChartcomponent';
import "./Impactos.css";

function scheduleFormated(horaInicio, horaFin) {
  if (horaInicio === undefined || horaFin === undefined) return ("Horario no disponible");

  const beginHour = Number(horaInicio.split(':')[1]) < 12 ? `${horaInicio.substring(0, 5)} AM` : `${horaInicio.substring(0, 5)} PM`;
  const endHour = Number(horaFin.split(':')[1]) < 12 ? `${horaFin.substring(0, 5)} AM` : `${horaFin.substring(0, 5)} PM`;;
  
  const schedule = `${beginHour} - ${endHour}`;
  return schedule;
};

function formatNumber(number) {
  // Check if the input is a number and format it
  if (!isNaN(number)) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(number);
  }
  // Return the input as is if it's not a number
  return number;
};

function formatHour(hour) {
  if (hour === undefined) return "No disponible"

  // Convert the hour to a number to handle both string and number inputs
  const hourNum = parseInt(hour, 10);
  // Determine AM or PM
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  // Convert 24-hour time to 12-hour time
  const hour12 = hourNum % 12 || 12; // Converts "0" to "12"
  // Return the formatted string
  return `${hour12} ${ampm}`;
};

const formatDateString = (dateString) => {
  const [datePart] = dateString.split(' '); // Obtener solo la parte de la fecha (YYYY-MM-DD)
  const [year, month, day] = datePart.split('-'); // Dividir la fecha en año, mes y día
  return `${day}-${month}-${year}`; // Formatear la fecha como DD-MM-YYYY
};

function Impactos() {
  const [pantallas, setPantallas] = useState([]);;
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState([pantallas[0]]);
  const [panelData, setPanelData] = useState([]);
  const [activeButton, setActiveButton] = useState("hourly");
  const [kpiData, setKpiData] = useState([]);

  let pantallaImage = Panel220Photo;

  if(pantallaSeleccionada.id_pantalla === 1) {
    pantallaImage = Panel220Photo;
  } else if(pantallaSeleccionada.id_pantalla === 2) {
    pantallaImage = Panel302Photo;
  } else if(pantallaSeleccionada.id_pantalla === 3) {
    pantallaImage = Panel410Photo;
  }

  // Ajustar la fecha actual para que sea a las 12 de la noche
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Ajusta la hora a las 12 de la noche

  // Restar un día a la fecha actual
  currentDate.setDate(currentDate.getDate() - 1);

  const endDate = currentDate.toISOString().replace('T', ' ').substring(0, 19);

  // Calcular startDate como dos meses antes del día actual, menos un día, a las 12 de la noche
  const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  twoMonthsAgo.setHours(0, 0, 0, 0); // Ajusta la hora a las 12 de la noche

  const startDate = twoMonthsAgo.toISOString().replace('T', ' ').substring(0, 19);

  useEffect(() => {
    const fetchPantallasData = async () => {
      try {
        const url = `http://localhost:3000/api/pantallas`;
        const response = await fetch(url);
        const data = await response.json();
        setPantallas(data);
        setPantallaSeleccionada(data[0]); // Estableciendo una pantalla por defecto
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPantallasData();
  },[]);

  useEffect(() => {
    const fetchKpiDta = async () => {
      try {
        const url = `http://localhost:3000/api/impactos/kpiData`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPantalla: pantallaSeleccionada.id_pantalla,
            beginDate: startDate,
            endDate: endDate,
            startHour: pantallaSeleccionada.hora_inicio,
            endHour: pantallaSeleccionada.hora_fin
          })
        });

        const data = await response.json();
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchHourlyPanelData = async () => {
      try {
        const url = `http://localhost:3000/api/impactos/hourlyData`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPantalla: pantallaSeleccionada.id_pantalla,
            beginDate: startDate,
            endDate: endDate,
            startHour: pantallaSeleccionada.hora_inicio,
            endHour: pantallaSeleccionada.hora_fin
          })
        });

        const data = await response.json();
        setPanelData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }      
    };

    const fetchDailyPanelData = async () => {
      try {
        const url = `http://localhost:3000/api/impactos/dailyData`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPantalla: pantallaSeleccionada.id_pantalla,
            beginDate: startDate,
            endDate: endDate,
            startHour: pantallaSeleccionada.hora_inicio,
            endHour: pantallaSeleccionada.hora_fin
          })
        });

        const data = await response.json();
        setPanelData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchKpiDta();

    if(activeButton === "hourly") {
      fetchHourlyPanelData();

    }else{
      fetchDailyPanelData();
    }

  }, [pantallaSeleccionada, activeButton]);

  return (
    <>
      <div className="visualizador-impactos-container">
        <div className="visualizador-impactos-seleccion-info-container">
          <div className="visualizador-impactos-seleccion-container">
            <select 
              className="panel-dropdown"
              onChange={(e) => setPantallaSeleccionada(pantallas.find(p => p.id_pantalla === parseInt(e.target.value)))}>
              {pantallas.map(pantalla => (
                <option key={pantalla.id_pantalla} value={pantalla.id_pantalla}>
                  {pantalla.nombre_pantalla}
                </option>
              ))}
            </select>
          </div>
          <div className="visualizador-impactos-info-container">
            <img 
              src={pantallaImage} 
              alt={pantallaSeleccionada.name} 
              className="visualizador-impactos-info-image"
            />
            <p className="tittle-visualisador-de-impactos-info-container"><b>Dirección: </b></p>
            <p className="subtittle-visualisador-de-impactos-info-container">{pantallaSeleccionada.direccion_pantalla}</p>
            <p className="tittle-visualisador-de-impactos-info-container"><b>Horario: </b></p>
            <p className="subtittle-visualisador-de-impactos-info-container">{scheduleFormated(pantallaSeleccionada.hora_inicio, pantallaSeleccionada.hora_fin)}</p>
          </div>
        </div>
        <div className="visulizador-impactos-data-container">
          <div className="visualizador-impactos-kpi-container">
            <div className="kpi-item">
              <p className="kpi-title">Total de Impactos</p>
              <p className="kpi-value">{kpiData ? formatNumber(kpiData.totalImpactos) : "Cargando"}</p>
            </div>
            <div className="kpi-item">
              <p className="kpi-title">Promedio Diario</p>
              <p className="kpi-value">{kpiData ? formatNumber(kpiData.averageDaily) : "Cargando"}</p>
            </div>
            <div className="kpi-item">
              <p className="kpi-title">Hora Pico</p>
              <p className="kpi-value">{kpiData ? formatHour(kpiData.topHour) : "Cargando"}</p>
            </div>
          </div>
          <div className="visualizador-impactos-graph-container">
            <div className="visualizador-impactos-selection-graph-container">
                <button 
                  className={`visualizador-impactos-selection-button ${activeButton === "hourly" ? "visualizador-impactos-selection-button-active" : ""}`}
                  onClick={() => setActiveButton("hourly")}>
                  Hora
                </button>
                <button 
                  className={`visualizador-impactos-selection-button ${activeButton === "daily" ? "visualizador-impactos-selection-button-active" : ""}`}
                  onClick={() => setActiveButton("daily")}>
                  Día
                </button>
              </div>
            <div className="graph-container">
              {panelData ? (
                <>
                  <StackedBarChart data={panelData} type={activeButton}/>
                </>
              ) : (
                <p>Cargando datos...</p>
              )}
            </div>
            <p className="data-collection-legend">Datos recolectados desde {formatDateString(startDate)} hasta {formatDateString(endDate)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Impactos;
