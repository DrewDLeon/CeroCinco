import React, { useEffect, useState, useMemo } from 'react';
import CampañaCard from '../../components/misCampañas/CampañaCard';
import './MisCampañas.css';

function MisCampañas() {
  const [customerPanels, setCustomerPanels] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch customer panels
  //       let response = await fetch('http://localhost:5000/api/panels/56');
  //       let data = await response.json();
  //       setCustomerPanels(data.body.panels);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); 

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

  console.log(customerPanels);

  return (
    <div>
      <h2 >Bienvenido "Nombre de usuario"</h2>
      <h3>Mis Campañas</h3>
      {/* <div className='campañas-container'>
        {customerPanels.map((panel) => (
          <CampañaCard key={panel.id} props={panel} />
        ))}
      </div> */}
      <div className='campañas-container'>
        {testingData.map((panel) => (
          <CampañaCard key={panel.id} props={panel} />
        ))}
      </div>
    </div>
  );
}

export default MisCampañas;