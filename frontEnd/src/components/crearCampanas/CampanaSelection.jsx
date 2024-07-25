import React, {useState, useEffect} from 'react'
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import "./CampanaSelection.css"

// api_pantalla 220
// direccion_pantalla "Av. Benito Juarez"
// duracion_pantalla 15
// hora_fin "23:00:00"
// hora_inicio "07:00:00"
// id_pantalla 1
// medidas_pantalla "480x720p"
// nombre_pantalla "Centro"

function scheduleFormated(horaInicio, horaFin) {
  if (horaInicio === undefined || horaFin === undefined) return ("Horario no disponible");

  const beginHour = Number(horaInicio.split(':')[1]) < 12 ? `${horaInicio.substring(0, 5)} AM` : `${horaInicio.substring(0, 5)} PM`;
  const endHour = Number(horaFin.split(':')[1]) < 12 ? `${horaFin.substring(0, 5)} AM` : `${horaFin.substring(0, 5)} PM`;;
  
  const schedule = `${beginHour} - ${endHour}`;
  return schedule;
};

function CampanaSelection() {
  const [pantallasData, setPantallasData] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState([]);

  useEffect(() => {
    const fetchPantallasData = async () => {
      try{
        const url = `http://localhost:3000/api/pantallas`;
        const response = await fetch(url);
        const data = await response.json();
        setPantallasData(data); 
        setPantallaSeleccionada(data[0])
      } catch (error) {
        console.error('Errror fectching pantallas data', e);
      }
    };

    fetchPantallasData();
  }, []);

  useEffect(() => {
    setPantallaSeleccionada[pantallasData[0]];
  }, [pantallasData]);

  let pantallaImage = Panel220Photo;

  if(pantallaSeleccionada.id_pantalla === 1) {
    pantallaImage = Panel220Photo;
  } else if(pantallaSeleccionada.id_pantalla === 2) {
    pantallaImage = Panel302Photo;
  } else if(pantallaSeleccionada.id_pantalla === 3) {
    pantallaImage = Panel410Photo;
  }

  console.log(pantallaSeleccionada);
  return(
    <>
    <div className='campana-selection-container'>
      <div className='campana-selection-select-container'>
        <select 
          className="panel-dropdown"
          onChange={(e) => setPantallaSeleccionada(pantallasData.find(p => p.id_pantalla === parseInt(e.target.value)))}>
          {pantallasData.map(pantalla => (
            <option key={pantalla.id_pantalla} value={pantalla.id_pantalla}>
              {pantalla.nombre_pantalla}
            </option>
          ))}
        </select>
        <img src={pantallaImage} alt="imagen de la pantalla seleccionada" className='campana-selection-image'/>
      </div>
      <div className='campana-selection-text'>
          <strong>Dirreción</strong>
          <p>{pantallaSeleccionada.direccion_pantalla}</p>
          <strong>Horario</strong>
          <p>{scheduleFormated(pantallaSeleccionada.hora_inicio, pantallaSeleccionada.hora_fin)}</p>
          <strong>Duración por aparición</strong>
          <p>{pantallaSeleccionada.duracion_pantalla} segundos</p>
          <strong>Numero de apariciones por hora</strong>
          <p>{pantallaSeleccionada.duracion_pantalla} hacer los calculos basados en los segundos</p>
      </div>
    </div>
    </>
  );
}

export default CampanaSelection;