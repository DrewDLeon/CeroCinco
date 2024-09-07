import React, { useState, useEffect } from "react";
import CampanaSelection from "../../components/crearCampanas/CampanaSelection"
import DateRangeSelector from "../../components/crearCampanas/DateRangeSelector"
import MediaUpload from "../../components/crearCampanas/MediaUpload"
import ModalDisponibilidad from "../../components/crearCampanas/ModalDisponibilidad"
import SimboloAdvertencia from "../../assets/SimboloAdvertencia.svg"
import axios from 'axios';

import './CrearCampana.css';

function validParameters(pantallaSeleccionada, fechaInicio, fechaFin, days, selectedHours, files) {
  if (!pantallaSeleccionada) {
    alert("Por favor, seleccione una pantalla.");

    return false;
  }
  
  if (!fechaInicio) {
    alert("Por favor, seleccione una fecha de inicio.");

    return false;
  }
  
  if (!fechaFin) {
    alert("Por favor, seleccione una fecha de fin.");

    return false;
  }
  
  if (!days) {
    alert("Por favor, seleccione los días.");

    return false;
  }
  
  if (!selectedHours) {
    alert("Por favor, seleccione las horas.");

    return false;
  }

  if (!files) {
    alert("Por favor, suba su arte.");

    return false;
  }

  if (!files[0]) {
    alert("El arte que subio no es valido.");

    return false;
  }

  if (dayCounter(fechaInicio, fechaFin, days) === 0) {
    alert("Por favor, seleccione días que ocurran dentro del rango de fecha");
    
    return false;
  }

  return true;
}

function dayCounter(fechaInicio, fechaFin, weekDays) {
  let numDays = 0;
  const startDate = new Date(fechaInicio);
  const endDate = new Date(fechaFin);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    let dayOfWeek = d.getDay(); 
    dayOfWeek = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Ajustar para que Lunes sea 0

    if (weekDays[dayOfWeek] === 1) {
      numDays++;
    }
  }

  return numDays;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getUniqueDays(fechaInicio, fechaFin, days) {
    // Obtener los días únicos en el formato necesario "1,3,4".
    // El backend espera los días en el siguiente formato:
    // 1 = domingo, 2 = lunes, ..., 7 = sábado.
    let uniqueDays = "";
    const set = new Set();

    // El método getDay() de JavaScript devuelve los días de la semana en este formato:
    // 0 = domingo, 1 = lunes, ..., 6 = sábado.
    // Sin embargo, en nuestra variable 'days', los días están representados de la siguiente manera:
    // 0 = lunes, 1 = martes, ..., 6 = domingo.
    // En consecuencia, ajustamos la conversión de los valores para que coincidan con el formato de 'days'.

    for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
      // Usamos getDay() para obtener el día de la semana actual, donde 0 = domingo y 6 = sábado.
      let daysOfWeek = d.getDay(); 
      
      // Convertimos el valor devuelto por getDay() para que 0 = lunes y 6 = domingo:
      // Si getDay() devuelve 0 (domingo), lo cambiamos a 6 para alinearlo con 'days'.
      // De lo contrario, restamos 1 para que lunes sea 0.
      daysOfWeek = (daysOfWeek === 0 ? 6 : daysOfWeek - 1); 
      
      // Si el día en 'days' es marcado como seleccionado (con valor 1), lo añadimos al conjunto (set).
      if (days[daysOfWeek] === 1) {
        set.add(daysOfWeek);
      }
    }

    // Recorremos los días únicos en el set y los ajustamos para el formato requerido por el backend.
    // En el backend, el valor de domingo debe ser 1, así que lo cambiamos de 6 a 1.
    // Para los demás días, simplemente sumamos 2 al valor actual para obtener el formato correcto.
    for (let day of set) {
      if (day === 6) {
        uniqueDays += "1,";  // Domingo pasa a ser 1.
      } else {
        uniqueDays += `${day + 2},`;  // Para los demás días sumamos 2 para ajustar el formato.
      }
    }
  
    
    return uniqueDays = uniqueDays.substring(0, uniqueDays.length - 1);
}

function CrearCampanas() {
  const [pantallas, setPantallas] = useState([]);
  const [pantallaSeleccionada, setPantallaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [days, setDays] = useState(Array(7).fill(-1));
  const [selectedHours, setSelectedHours] = useState([]);
  const [dateRangeSelectorKey, setDateRangeSelectorKey] = useState(Date.now());
  const [nombreCampana, setNombreCampana] = useState("")
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  function resetForm() {
    setDays(Array(7).fill(-1));
    setSelectedHours([]);
    setFiles(null);
    setNombreCampana("");
    setDateRangeSelectorKey(Date.now());
  }
  

  function calculatebudget() {
    if (!pantallaSeleccionada || !fechaInicio || !fechaFin || !days || !selectedHours) {

      return 0;
    }

    return pantallaSeleccionada.costoHora * dayCounter(fechaInicio, fechaFin, days)  * selectedHours.length;
  }

  function calculateSpots() {
    if (!pantallaSeleccionada || !fechaInicio || !fechaFin || !days || !selectedHours) {

      return 0;
    }

    return dayCounter(fechaInicio, fechaFin, days) * selectedHours.length;
  }

  function handlePantallaSelecionadaChange(newPantalla) {
    setPantallaSeleccionada(newPantalla);
  }

  function handleFechasChange(newFechaInicio, newFechaFin) {
    setFechaInicio(newFechaInicio);
    setFechaFin(newFechaFin);
  }

  function handleFilesChange(newFiles) {
    setFiles(newFiles);
  }

  function handleNombreCampanaChange(event) {
    setNombreCampana(event.target.value);
  }

  function solicitarFechas() {
    if (!validParameters(pantallaSeleccionada, fechaInicio, fechaFin, days, selectedHours, files)) {

      return;
    }

    const inicio = formatDate(fechaInicio);

    const fin = formatDate(fechaFin);

    const uniqueDays = getUniqueDays(fechaInicio, fechaFin, days);

    // Tranforming hours into the right format
    let formatedHours = "";

    for (let hour of selectedHours) {
      formatedHours += `${hour.substring(0, 2)},`;
    }

    formatedHours = formatedHours.substring(0, formatedHours.length - 1);

    const url = import.meta.env.VITE_API_URL + `/api/crearCampana/getDisponibilidad/${inicio}/${fin}/${uniqueDays}/${formatedHours}/${pantallaSeleccionada.id_pantalla}`;

    // Use axios to make the GET request and open modal
    axios.get(url)
      .then(response => {
        setModalData(response.data); // Store the response data
        setIsModalOpen(true); // Open the modal
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const calculateAvailableSpots = (disponibilidad) => {
    return disponibilidad.filter(spot => spot.estatus === 0).length;
  };

  const calculateUnavailableSpots = (disponibilidad) => {
    return disponibilidad.filter(spot => spot.estatus !== 0).length;
  };

  const calculateCotizacion = (availableSpots) => {
    return availableSpots * pantallaSeleccionada.costoHora;
  };

  async function handleCreateCampana() {
    if (nombreCampana === "") {
      alert("Escribe el nombre de tu campaña");
      return;
    }
    // Chequea que todos los parámetros estén presentes
    if (!validParameters(pantallaSeleccionada, fechaInicio, fechaFin, days, selectedHours, files)) {
      return;
    }
  
    const formData = new FormData();
    
    formData.append('image', files[0]);
  
    const fecha_inicio = formatDate(fechaInicio);
    const fecha_fin = formatDate(fechaFin);
  
    const uniqueDays = getUniqueDays(fechaInicio, fechaFin, days);
  
    // Transformar las horas en el formato correcto
    let formatedHours = "";
  
    for (let hour of selectedHours) {
      formatedHours += `${hour.substring(0, 2)},`;
    }
  
    formatedHours = formatedHours.substring(0, formatedHours.length - 1);
  
    // Añadir otros datos necesarios
    formData.append('id_pantalla', pantallaSeleccionada.id_pantalla);
    formData.append('fecha_inicio', fecha_inicio);
    formData.append('fecha_fin', fecha_fin);
    formData.append('weekdays', uniqueDays);
    formData.append('horas', formatedHours);
    formData.append('nombre_campana', nombreCampana);
    formData.append('estatus', 1); // Estatus por defecto
    formData.append('costo', calculateCotizacion(calculateAvailableSpots(modalData.disponibilidad))); // Calcula el costo usando la función existente
    
    try {
      // Obtén el token del localStorage
      const token = localStorage.getItem('token');
  
      // Configurar el encabezado Authorization con el token
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/crearCampana/crearCampana`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Agrega el token al encabezado
          }
        }
      );
  
      if (response.status === 200) {
        alert('Campaña creada con éxito.');
        setIsModalOpen(false);
      } else {
        alert('Error al crear la campaña.');
      }
    } catch (error) {
      console.error('Error al crear la campaña:', error);
      alert('Ocurrió un error al intentar crear la campaña.');
    }
  }  

  function toggleDay(index) {
    const newDays = [...days];
    newDays[index] = newDays[index] === 1 ? -1 : 1;
    setDays(newDays);
  }

  function generateTimeSlots(start, end) {
    const times = [];
    let currentTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
  
    while (currentTime <= endTime) {
      times.push(currentTime.toTimeString().slice(0, 5)); // Formato "HH:MM"
      currentTime.setHours(currentTime.getHours() + 1); // Incrementar en 1 hora
    }
  
    return times;
  }

  function toggleHour(hour) {
    const newSelectedHours = selectedHours.includes(hour)
      ? selectedHours.filter(h => h !== hour)
      : [...selectedHours, hour];
    setSelectedHours(newSelectedHours);
  }

  useEffect(() => {
    const fetchPantallasData = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + `/api/pantallas`;
        const response = await fetch(url);
        const data = await response.json();
        setPantallas(data);
        if (data.length > 0) {
          setPantallaSeleccionada(data[0]); // Estableciendo una pantalla por defecto
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    setDateRangeSelectorKey(Date.now());
    fetchPantallasData();
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const availableHours = pantallaSeleccionada ? generateTimeSlots(pantallaSeleccionada.hora_inicio, pantallaSeleccionada.hora_fin) : [];

  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <>
      <div className="creacion-campana-container">
        <div className="edicion-campana-container">
          <h3>Pantallas</h3>
          <div>
            <CampanaSelection 
              pantallas={pantallas}
              pantallaSeleccionada={pantallaSeleccionada}
              handlePantallaSelecionadaChange={handlePantallaSelecionadaChange}
            />
          </div>
          {pantallaSeleccionada && (
            <>
              <h3>Fechas</h3>
              <div>
                <DateRangeSelector 
                  key={dateRangeSelectorKey}
                  handleFechasChange={handleFechasChange}
                />
              </div>
              <h3>Días</h3>
              <div className="days-container">
                {dayNames.map((day, index) => (
                  <div key={index}onClick={() => toggleDay(index)}
                    className={`day-selector ${days[index] === 1 ? 'selected' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <h3>Horarios</h3>
              <div>
                {availableHours.map(hour => (
                    <div key={hour}onClick={() => toggleHour(hour)}
                      className={`hour-selector ${selectedHours.includes(hour) ? 'selected' : ''}`}
                    >
                      {hour}
                    </div>
                  ))}
              </div>
              <h3>Arte</h3>
              <div>
                <MediaUpload 
                  pantallaSeleccionada={pantallaSeleccionada} 
                  onFilesChange={handleFilesChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="cotizacion-campana-container">
          <div className="advertencia-section">
            <img src={SimboloAdvertencia} alt="simbolo de advertencia" />
            <p>Arte bajo revisión por términos aceptados</p>
          </div>
          <h4>Cantidad spots aproximado</h4>
          <p>{calculateSpots()}</p>
          <h4>Costo por hora</h4>
          <p>${pantallaSeleccionada.costoHora}</p>
          <div className="cotizacion-section">
            <h4>Cotización</h4>
            <p>${calculatebudget()}</p>
          </div>
          <button className="cotizacion-boton" onClick={solicitarFechas}>Solicitar fechas</button>
        </div>
      </div>
      {modalData && (
        <ModalDisponibilidad isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="modal-header">
            <input
              type="text"
              className="modal-title-input"
              value={nombreCampana}
              onChange={handleNombreCampanaChange}
              placeholder="Ingrese el nombre de tu campaña aqui"
            />
          </div>
          
          <div className="modal-body">
            <p className="date-range">
              Rango de fechas: <span className="placeholder">{`${formatDate(fechaInicio)} - ${formatDate(fechaFin)}`}</span>
            </p>
            <p className="screen-name">
              Nombre de pantalla: <span className="placeholder">{pantallaSeleccionada.nombre_pantalla}</span>
            </p>
            <p className="art-name">
              Nombre del arte: <span className="placeholder">{files[0].name}</span>
            </p>
            
            <p className="available-spots emphasis">
              Spots disponibles encontrados: {calculateAvailableSpots(modalData.disponibilidad)}
            </p>
            <p className="unavailable-spots emphasis">
              Número de spots no disponibles: {calculateUnavailableSpots(modalData.disponibilidad)}
            </p>
            <p className="cotizacion emphasis">
              Cotización: ${calculateCotizacion(calculateAvailableSpots(modalData.disponibilidad))}
            </p>
          </div>
          
          <div className="modal-footer">
            <button className="modal-button" onClick={handleCreateCampana}>
              Crear campaña
            </button>
          </div>

          <div className="modal-details">
            <h3 className="details-title">Detalles de Disponibilidad:</h3>
            <ul className="details-list">
              {modalData.disponibilidad.map((spot, index) => (
                <li className="details-item" key={index}>
                  Fecha: {new Date(spot.fecha).toLocaleDateString()}, 
                  Hora: {spot.hora}:00, 
                  Estatus: {spot.estatus === 0 ? (
                    <span className="status-available">Disponible ✔️</span>
                  ) : (
                    <span className="status-unavailable">No disponible ❌</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </ModalDisponibilidad>
      )}
    </>
  );
}

export default CrearCampanas;
