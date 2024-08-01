import React from "react";
import './AdminCampanaItemsHeader.css';

function AdminCampanaItemsHeader() {
  return (
    <div className="campana-header-container">
      <div className="campana-header-cell">
        Nombre
      </div>
      <div className="campana-header-cell">
        Referencia
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

export default AdminCampanaItemsHeader;
