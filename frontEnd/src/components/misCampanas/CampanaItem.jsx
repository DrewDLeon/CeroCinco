// CampanaItem.js
import React, { useState } from 'react';
import CampanaModal from './CampanaModal';
import './CampanaItem.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  } else {
    return 'Invalid date';
  }
}

function translateStatus(status) {
  console.log(typeof(status));
  if (status === 0) {
    return "Rechazado";
  }

  if (status === 1) {
    return "En revision";   
  }

  if (status === 2) {
    return "Pendiente de pago";
  }

  if (status === 3) {
    return "Aceptada";
  }

  if (status === 4) {
    return "Activa";
  }

  if (status === 5) {
    return "Finalizada";
  }

  return "Error en el estatus";
}

function CampanaItem({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mis-campana-item-container">
        <div className="campana-item-cell">
          {props.nombre_campaña}
        </div>
        <div className="mis-campana-item-cell">
          {formatDate(props.fecha_inicio)}
        </div>
        <div className="mis-campana-item-cell">
          {formatDate(props.fecha_fin)}
        </div>
        <div className="mis-campana-item-cell">
          {translateStatus(props.estatus)}
        </div>
        <div className="mis-campana-item-cell">
          <button onClick={openModal}>Más info</button>
        </div>
      </div>
      <CampanaModal isOpen={isModalOpen} onClose={closeModal} campana={props} />
    </>
  );
}

export default CampanaItem;
