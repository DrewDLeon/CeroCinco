import React from "react";
import smallLogo from "../../assets/logos/SmallLogo.svg";
import completeLogo from "../../assets/logos/CompleteLogo.svg";
import "./CeroCincoPresentation.css";

function CeroCincoPresentation() {
  return (
    <div className="presentation-container">
      <img src={smallLogo} alt="Logo chico" className="small-logo-presentation"/>
      <img src={completeLogo} alt="Logo completo cero cinco" className="complete-logo-presentation"/>
      <p className="presentation-text">Creamos experiencias únicas</p>
    </div>
  );
}

export default CeroCincoPresentation;