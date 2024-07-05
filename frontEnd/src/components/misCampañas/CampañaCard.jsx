import React from 'react';
import { useNavigate } from 'react-router-dom';
import Panel220Photo from '../../assets/paneles/panel220.png';
import Panel302Photo from '../../assets/paneles/panel302.jpg';
import Panel410Photo from '../../assets/paneles/panel410.jpg';
import VisualizationImage from '../../assets/paneles/visualization-image.svg';
import './CampañaCard.css';



function CampañaCard({props}) {
  const navigate = useNavigate();

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

  const handeClick = () => {
    navigate('/dashboard', { state: {panelId: props.id} });
  }

  return (
    <>
    <div className='campaña-card-component-shape'>
      <div className='campaña-card-container' onClick={handeClick}>
        <div className='campaña-card-image-container'>
          <div className='campaña-card-panel-data'>
            <p className='campaña-card-panel-date'>1/1/2024</p>
          </div>
          <img src={currentPanelPhoto} alt="imagen de panel" className='campaña-panel-image'/>
        </div>
      </div>

      <div className='campaña-card-panel-description-and-data-container'>
        <div className='campaña-card-panel-description'>
          <p className='campaña-card-panel-name'>{props.name}</p>
          <p className='campaña-card-panel-description'>{props.description}</p>
        </div>
      </div>
    </div>
    </>
  );s
}

export default CampañaCard;