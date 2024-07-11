// CampanaItem.js
import React, { useState } from 'react';
import CampanaModal from './CampanaModal'; // Asegúrate de que la ruta sea correcta
import './CampanaItem.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  } else {
    return 'Invalid date';
  }
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
      <div className="campana-item-container">
        <div className="campana-item-cell">
          Nombre de la campaña
        </div>
        <div className="campana-item-cell">
          {props.direccion_pantalla}
        </div>
        <div className="campana-item-cell">
          {formatDate(props.fecha_inicio)}
        </div>
        <div className="campana-item-cell">
          {formatDate(props.fecha_fin)}
        </div>
        <div className="campana-item-cell">
          {props.estatus === 1 ? "Activo" : "En revision"}
        </div>
        <div className="campana-item-cell">
          <button onClick={openModal}>Más info</button>
        </div>
      </div>
      <CampanaModal isOpen={isModalOpen} onClose={closeModal} campana={props} />
    </>
  );
}

export default CampanaItem;
