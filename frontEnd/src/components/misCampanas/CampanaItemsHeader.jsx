import React from "react";
import './CampanaItemsHeader.css';

function CampanaItemsHeader() {
  return (
    <div className="campana-header-container">
      <div className="campana-header-cell">
        Nombre
      </div>
      <div className="campana-header-cell">
        Dirección Pantalla
      </div>
      <div className="campana-header-cell">
        Fecha Inicio
      </div>
      <div className="campana-header-cell">
        Fecha Fin
      </div>
      <div className="campana-header-cell">
        Estatus
      </div>
      <div className="campana-header-cell">
        Más Info
      </div>
    </div>
  );
}

export default CampanaItemsHeader;
