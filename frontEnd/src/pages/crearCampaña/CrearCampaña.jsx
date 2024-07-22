import React, { useState, useEffect } from "react";
import CrearCampañaCard from "../../components/crearCampañas/CrearCampañaCard";
import CalendarComponent from "../../components/rangeCalendar/RangeCalendar"; 
import CampanaSelection from "../../components/crearCampañas/CampanaSelection"
import './CrearCampaña.css';

// api_pantalla 220
// direccion_pantalla "Av. Benito Juarez"
// duracion_pantalla 15
// hora_fin "23:00:00"
// hora_inicio "07:00:00"
// id_pantalla 1
// medidas_pantalla "480x720p"
// nombre_pantalla "Centro"

function CrearCampañas() {
  const [pantallas, setPantallas] = useState([]);;
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState([pantallas[0]]);
  const [cotizacion, setCotizacion] = useState(0);

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
  },[])

  // console.log(pantallas);
  return (
    <>
    <div className="creacion-campana-container">
        <div className="edicion-campana-container">
          <div>
            <CampanaSelection />
          </div>
          <div>
            <CalendarComponent />
          </div>
          <div>
            <h3>Tabla para los horarios</h3>
          </div>
          <div>
            <h3>Lugar para subir las cosas</h3>
          </div>
        </div>
        <div className="cotizacion-campana-container">
          <p>Campaña sujeta a revision</p>
          <p>costo por spot: </p>
          <strong>Cotizacion</strong>
          <p>1000 pesos</p>
          <button>crear campana</button>
        </div>
    </div>
    </>
  );
}

export default CrearCampañas;