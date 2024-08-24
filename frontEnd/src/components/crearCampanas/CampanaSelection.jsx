import React, {useState, useEffect} from 'react'
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import "./CampanaSelection.css"

function scheduleFormated(horaInicio, horaFin) {
  if (horaInicio === undefined || horaFin === undefined) return ("Horario no disponible");

  const beginHour = Number(horaInicio.split(':')[1]) < 12 ? `${horaInicio.substring(0, 5)} AM` : `${horaInicio.substring(0, 5)} PM`;
  const endHour = Number(horaFin.split(':')[1]) < 12 ? `${horaFin.substring(0, 5)} AM` : `${horaFin.substring(0, 5)} PM`;;
  
  const schedule = `${beginHour} - ${endHour}`;
  return schedule;
};

function CampanaSelection({pantallas, pantallaSeleccionada, handlePantallaSelecionadaChange}) {
  let pantallaImage = Panel220Photo;

  if(pantallaSeleccionada.id_pantalla === 1) {
    pantallaImage = Panel220Photo;
  } else if(pantallaSeleccionada.id_pantalla === 2) {
    pantallaImage = Panel302Photo;
  } else if(pantallaSeleccionada.id_pantalla === 3) {
    pantallaImage = Panel410Photo;
  }
  
  return(
    <>
    <div className='campana-selection-container'>
      <div className='campana-selection-select-container'>
        <select 
          className="panel-dropdown"
          onChange={(e) => handlePantallaSelecionadaChange(pantallas.find(p => p.id_pantalla === parseInt(e.target.value)))}>
          {pantallas.map(pantalla => (
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
          <p>{3600 / (pantallaSeleccionada.duracion_pantalla * 10)} apariciones</p>
          <strong>Medidas de la pantalla</strong>
          <p>{pantallaSeleccionada.medidas_pantalla}</p>
      </div>
    </div>
    </>
  );
}

export default CampanaSelection;