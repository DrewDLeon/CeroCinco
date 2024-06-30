import React from 'react'
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import './CrearCampañaCard.css';

function CrearCampañaCard({props}) {
  let currentPanelPhoto;

  if(props.id == 220){
    currentPanelPhoto = Panel220Photo;

  }else if(props.id == 302){
    currentPanelPhoto = Panel302Photo;

  }else if(props.id == 410){
    currentPanelPhoto = Panel410Photo;

  }else{
    currentPanelPhoto = Panel220Photo;
  }

  return (
      <div className='crear-campaña-card-container'>
          <img src={currentPanelPhoto} alt="Imagen de pantalla" className='crear-campaña-image'/>
          <div className='crear-campaña-selection-status'></div>
      </div>
  )
}

export default CrearCampañaCard;