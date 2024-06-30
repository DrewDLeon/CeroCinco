import React, { useState, useEffect } from "react";
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import StackedBarChart from '../../components/graphs/StackedBarChartcomponent';
import "./Impactos.css";

// Datos de las pantallas
// Formato hora: Numero flotante. La parte entera es la hora y la parte decimal los minutos en porcentaje (0.5 = 30 minutos)
const pantallas = [
  {
    image: Panel220Photo,
    address: "Av. Benito Juárez",
    description: "Av. Benito Juárez",
    id: 220,
    name: "CENTRO",
    horaInicio: 7,
    horaCierre: 23,
  },
  {
    image: Panel302Photo,
    address: "Manuel L. Barragán Nte. 325, Anáhuac, 66450 San Nicolás de los Garza, N.L., México",
    description: "Plaza Fiesta Anáhuac",
    id: 302,
    name: "PLAZA FIESTA ANÁHUAC",
    horaInicio: 8,
    horaCierre: 22,
  },
  {
    image: Panel410Photo,
    address: "Blvd. Rogelio Cantú Gómez 1000, Las Lajas, Las Colinas Residencial, 64638 Monterrey, N.L",
    description: "Colinas Via 02",
    id: 410,
    name: "SAN JERONIMO",
    horaInicio: 7,
    horaCierre: 23,
  },
  {
    // !falta cambiar los datos de esta para que corresponda a la pantalla de garza sada
    image: Panel410Photo,
    address: "Blvd. Rogelio Cantú Gómez 1000, Las Lajas, Las Colinas Residencial, 64638 Monterrey, N.L",
    description: "Colinas Via 02",
    id: 410,
    name: "GARZA SADA",
    horaInicio: 7,
    horaCierre: 23,
  },
];

function formatearHora(hora) {
  const horas = Math.floor(hora);
  const minutos = Math.round((hora - horas) * 60);
  const horasStr = horas < 10 ? `0${horas}` : `${horas}`;
  const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;
  return horas < 13 ?`${horasStr}:${minutosStr} AM` : `${horasStr}:${minutosStr} PM`;
}

function Impactos() {
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(pantallas[0]);
  const [panelData, setPanelData] = useState([]);
  const [activeButton, setActiveButton] = useState("hourly");
  const [kpiData, setKpiData] = useState({ totalPeople: 0, averageDaily: 0, averageMonthly: 0 });

  // Ajustar la fecha actual para que sea a las 12 de la noche
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Ajusta la hora a las 12 de la noche

  // Calcular startDate como dos meses antes del día actual, menos un día, a las 12 de la noche
  const twoMonthsAgo = new Date(new Date(currentDate).setMonth(currentDate.getMonth() - 2));
  twoMonthsAgo.setDate(twoMonthsAgo.getDate() - 1); // Restar un día adicional
  twoMonthsAgo.setHours(0, 0, 0, 0); // Ajusta la hora a las 12 de la noche

  const startDate = twoMonthsAgo.toISOString().replace('T', ' ').substring(0, 19);
  const endDate = currentDate.toISOString().replace('T', ' ').substring(0, 19);
  console.log(startDate, endDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (activeButton === "hourly") {
          url = `http://localhost:5000/api/panels/hourly-data/${pantallaSeleccionada.id}?start_date=${startDate}&end_date=${endDate}`;
        } else if (activeButton === "daily") {
          url = `http://localhost:5000/api/panels/daily-data/${pantallaSeleccionada.id}?start_date=${startDate}&end_date=${endDate}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setPanelData(data.body.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchKpiData = async () => {
      try {
        const url = `http://localhost:5000/api/panels/kpi-data/${pantallaSeleccionada.id}?start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(url);
        const data = await response.json();
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };

    fetchData();
    fetchKpiData();
  }, [pantallaSeleccionada, activeButton]);

  return (
    <>
      {/* <h2>Impactos</h2> */}
      <div className="visualizador-impactos-container">
        <div className="visualizador-impactos-seleccion-info-container">
          <div className="visualizador-impactos-seleccion-container">
            <select 
              className="panel-dropdown"
              onChange={(e) => setPantallaSeleccionada(pantallas.find(p => p.id === parseInt(e.target.value)))}>
              {pantallas.map(pantalla => (
                <option key={pantalla.id} value={pantalla.id}>
                  {pantalla.name}
                </option>
              ))}
            </select>
          </div>
          <div className="visualizador-impactos-info-container">
            {/* <h3>{pantallaSeleccionada.name}</h3> */}
            <img 
              src={pantallaSeleccionada.image} 
              alt={pantallaSeleccionada.name} 
              className="visualizador-impactos-info-image"
            />
            <p><b>Dirección: </b></p>
            <p>{pantallaSeleccionada.address}</p>
            <p><b>Horario: </b></p>
            <p>{formatearHora(pantallaSeleccionada.horaInicio)} - {formatearHora(pantallaSeleccionada.horaCierre)}</p>
          </div>
        </div>
        <div className="visulizador-impactos-data-container">
          <div className="visualizador-impactos-kpi-container">
            <div className="kpi-item">
              <p className="kpi-title">Total de Impactos</p>
              <p className="kpi-value">{kpiData.totalPeople}</p>
            </div>
            <div className="kpi-item">
              <p className="kpi-title">Promedio Diario</p>
              <p className="kpi-value">{kpiData.averageDaily}</p>
            </div>
            <div className="kpi-item">
              <p className="kpi-title">Promedio Mensual</p>
              <p className="kpi-value">{Math.round(kpiData.averageMonthly)}</p>
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
              {panelData.length > 0 ? (
                <>
                  <StackedBarChart data={panelData} type={activeButton} beginHour={pantallaSeleccionada.horaInicio} endHour={pantallaSeleccionada.horaCierre}/>
                </>
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <p className="data-collection-legend">Datos recolectados desde {startDate.split(' ')[0]} hasta {endDate.split(' ')[0]}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Impactos;
