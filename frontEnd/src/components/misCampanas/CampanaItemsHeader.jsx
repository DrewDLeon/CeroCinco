import React from "react";
import './CampanaItemsHeader.css';

function CampanaItemsHeader() {
  return (
    <div className="mis-campana-header-container">
      <div className="campana-header-cell">
        Nombre
      </div>
      <div className="mis-campana-header-cell">
        Fecha Inicio
      </div>
      <div className="mis-campana-header-cell">
        Fecha Fin
      </div>
      <div className="mis-campana-header-cell">
        Estatus
      </div>
      <div className="mis-campana-header-cell">
        Más Info
      </div>
    </div>
  );
}

export default CampanaItemsHeader;
