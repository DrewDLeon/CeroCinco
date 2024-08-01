import React, { useState } from 'react';
import CampanaModal from './AdminCampanaModal';
import './AdminCampanaItem.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  } else {
    return 'Invalid date';
  }
}

function AdminCampanaItem({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(props.estatus)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const url = "http://localhost:3000/api/adminCampanas/updateEstatusCampana";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newStatus: newStatus,
          idCampana: props.id_campaña
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStatus(newStatus);
      console.log('Status updated successfully:', data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="campana-item-container">
        <div className="campana-item-cell">
          {props.nombre_campaña}
        </div>
        <div className="campana-item-cell">
          XXXXXXXXX
        </div>
        <div className="campana-item-cell">
          {formatDate(props.fecha_inicio)}
        </div>
        <div className="campana-item-cell">
          {formatDate(props.fecha_fin)}
        </div>
        <div className="campana-item-cell">
        <select value={status} onChange={(e) => handleStatusChange(e)}>
          <option value="0">Rechazado</option>
          <option value="1">En revision</option>
          <option value="2">Pendiente de pago</option>
          <option value="3">Aceptada</option>
          <option value="4">Activa</option>
          <option value="5">Finalizada</option>
        </select>
        </div>
        <div className="campana-item-cell">
          <button onClick={openModal}>Más info</button>
        </div>
      </div>
      <CampanaModal isOpen={isModalOpen} onClose={closeModal} campana={props} status={status}/>
    </>
  );
}

export default AdminCampanaItem;
