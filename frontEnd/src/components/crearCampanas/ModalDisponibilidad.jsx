import React, { useEffect, useState, useMemo } from 'react';
//import './Modal.css'; // Opcional: para agregar estilos
import "./ModalDisponibilidad.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    // Numero total de spot disponibles, Cotizacion, numero de dias no disponibles, un boton de crear campanana

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  