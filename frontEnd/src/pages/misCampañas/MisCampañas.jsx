import React, { useEffect, useState } from 'react';
import CampanaItem from '../../components/misCampañas/CampanaItem';
import CampanaItemsHeader from '../../components/misCampañas/CampanaItemsHeader';
import './MisCampañas.css';

function MisCampañas() {
  const [campanas, setCampanas] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCampanas = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const url = `http://localhost:3000/api/campanas/campanasWithPantalla/`;
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener las campañas');
        }
  
        const data = await response.json();
        setCampanas(data);
        setProcessedData(data); // Initialize with full data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchCampanas();
  }, []);  

  useEffect(() => {
    processData();
  }, [searchName, sortOrder, filterStatus]);

  const processData = () => {
    let filteredData = [...campanas];

    // Filter by name
    if (searchName) {
      filteredData = filteredData.filter(campana => 
        campana.direccion_pantalla.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus) {
      filteredData = filteredData.filter(campana => 
        filterStatus === 'Activo' ? campana.estatus === 1 : campana.estatus === 0
      );
    }

    // Sort by start date
    filteredData.sort((a, b) => {
      const dateA = new Date(a.fecha_inicio);
      const dateB = new Date(b.fecha_inicio);

      if (sortOrder === 'ASC') {
        return dateA - dateB;
      } else if (sortOrder === 'DSC') {
        return dateB - dateA;
      } else {
        return 0;
      }
    });

    setProcessedData(filteredData);
  };

  const toggleSortOrder = (order) => {
    setSortOrder(prevOrder => prevOrder === order ? '' : order);
  };

  const toggleFilterStatus = (status) => {
    setFilterStatus(prevStatus => prevStatus === status ? '' : status);
  };

  console.log('campanas:', campanas);

  return (
    <div className='container'>
      <div className='filters-and-headers-container'>
        <div className='filters-container'>
            <div className='filter-column'>
              <label className='filter-label' htmlFor='searchByName'>Buscar por nombre:</label>
              <textarea 
                className='filter-textarea' 
                id='searchByName' 
                name='searchByName'
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              ></textarea>
            </div>
            <div className='filter-column'>
              <label className='filter-label'>Ordenar por fecha de inicio:</label>
              <div className='buttons-container'>
                <button 
                  className={`filter-button ${sortOrder === 'ASC' ? 'active-filter-button' : ''}`} 
                  onClick={() => toggleSortOrder('ASC')}
                >
                  ASC
                </button>
                <button 
                  className={`filter-button ${sortOrder === 'DSC' ? 'active-filter-button' : ''}`} 
                  onClick={() => toggleSortOrder('DSC')}
                >
                  DSC
                </button>
              </div>
            </div>
            <div className='filter-column'>
              <label className='filter-label'>Filtrar por estado:</label>
              <div className='buttons-container'>
                <button 
                  className={`filter-button ${filterStatus === 'Activo' ? 'active-filter-button' : ''}`} 
                  onClick={() => toggleFilterStatus('Activo')}
                >
                  Activo
                </button>
                <button 
                  className={`filter-button ${filterStatus === 'En proceso' ? 'active-filter-button' : ''}`} 
                  onClick={() => toggleFilterStatus('En proceso')}
                >
                  En proceso
                </button>
              </div>
            </div>
          </div>
          <CampanaItemsHeader />
        </div>
      <div>
      <div className='campañas-container'>
        {processedData.map((campana) => (
          <CampanaItem key={campana.id_campaña} props={campana} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default MisCampañas;
