import React, { useEffect, useState } from 'react';
import AdminCampanaItem from '../../components/adminCampanas/AdminCampanaItem';
import AdminCampanaItemsHeader from '../../components/adminCampanas/AdminCampanaItemsHeader';
//import './MisCampanas.css';

function AdminCampanas() {
  const [campanas, setCampanas] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterReference, setFilterReference] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCampanas = async () => {
      try {  
        const url = `http://localhost:3000/api/adminCampanas/getAdminCampanas/`;
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
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
  }, [searchName, sortOrder, filterStatus, filterReference]);

  const processData = () => {
    let filteredData = [...campanas];

    // Filter by name
    if (searchName) {
      filteredData = filteredData.filter(campana => 
        campana.nombre_campaña.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by reference
    if (filterReference) {
      filteredData = filteredData.filter(campana => 
        campana.id_campaña === Number(filterReference)
      );
    }

    // Filter by status
    if (filterStatus) {
      filteredData = filteredData.filter(campana => 
        campana.estatus === parseInt(filterStatus)
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
  
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

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
              <label className='filter-label' htmlFor='searchByName'>Buscar por referencia:</label>
              <textarea 
                className='filter-textarea' 
                id='filterReference' 
                name='filterReference'
                value={filterReference}
                onChange={e => setFilterReference(e.target.value)}
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
              <select onChange={handleStatusChange} value={filterStatus}>
                <option value=''>Ninguno</option>
                <option value='0'>Rechazado</option>
                <option value='1'>En revision</option>
                <option value='2'>Pendiente de pago</option>
                <option value='3'>Aceptada</option>
                <option value='4'>Activa</option>
                <option value='5'>Finalizada</option>
              </select>
            </div>
          </div>
          <AdminCampanaItemsHeader />
        </div>
      <div>
      <div className='campañas-container'>
        {processedData.map((campana) => (
          <AdminCampanaItem key={campana.id_campaña} props={campana} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default AdminCampanas;
