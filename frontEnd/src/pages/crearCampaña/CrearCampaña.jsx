import React from "react";
import CrearCampañaCard from "../../components/crearCampañas/CrearCampañaCard";
import CalendarComponent from "../../components/rangeCalendar/RangeCalendar"; 
import './CrearCampaña.css';

function CrearCampañas() {
  const testingData = [
    {
      id: 220,
      name: 'Campaña 3',
      description: 'Campaña de prueba',
    },
    {
      id: 302,
      name: 'Campaña 3',
      description: 'Campaña de prueba',
    },
    {
      id: 410,
      name: 'Campaña 3',
      description: 'Campaña de prueba',
    },
  ];

  return (
    <div>
      <h2>CrearCampañas</h2>
      <div>
        <div className='crear-campaña-container'>
          {testingData.map((panel) => (
            <CrearCampañaCard key={panel.id} props={panel} />
          ))}
        </div>
        <CalendarComponent />
        <div>

        </div>
      </div>
    </div>
  );
}

export default CrearCampañas;