import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./AdminGestionPantallas.css"

function AdminGestionPantallas() {
    const [pantallas, setPantallas] = useState([]);
    const [selectedPantalla, setSelectedPantalla] = useState(null);

    useEffect(() => {
        async function fetchPantallas() {
            try {
                const url = import.meta.env.VITE_API_URL + "/api/adminGestionPantallas/";
                const response = await axios.get(url);
                setPantallas(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchPantallas();
    }, []);

    const handleSelectPantalla = (pantalla) => {
        setSelectedPantalla(pantalla);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedPantalla({
            ...selectedPantalla,
            [name]: value,
        });
    };

    const handleCancel = () => {
        setSelectedPantalla(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!selectedPantalla) return;

        try {
            const url = `${import.meta.env.VITE_API_URL}/api/adminGestionPantallas/update/${selectedPantalla.id_pantalla}`;
            await axios.put(url, selectedPantalla);
            
            // Actualizar la lista de pantallas localmente después de una actualización exitosa
            setPantallas(pantallas.map(pantalla =>
                pantalla.id_pantalla === selectedPantalla.id_pantalla ? selectedPantalla : pantalla
            ));

            alert('Los cambios se han guardado exitosamente.');
            setSelectedPantalla(null); // Deseleccionar la pantalla después de guardar

        } catch (error) {
            console.error('Error actualizando la pantalla:', error);
            alert('Ocurrió un error al intentar guardar los cambios.');
        }
    };

    console.log(selectedPantalla);

    return (
        <div className="gestion-campanas-container">
            <div className="pantallas-list">
                <h2 className="pantallas-list-title">Lista de Pantallas</h2>
                <ul className="pantallas-list-ul">
                    {pantallas.map((pantalla) => (
                        <li
                            key={pantalla.id_pantalla}
                            onClick={() => handleSelectPantalla(pantalla)}
                            className={`pantallas-list-item ${selectedPantalla?.id_pantalla === pantalla.id_pantalla ? 'selected' : ''}`}
                        >
                            {pantalla.nombre_pantalla}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pantalla-details">
                {selectedPantalla ? (
                    <>
                        <h2 className="pantalla-details-title">Editar Pantalla: {selectedPantalla.nombre_pantalla}</h2>
                        <form className="pantalla-details-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-group-label">Nombre de Pantalla</label>
                                <input
                                    type="text"
                                    name="nombre_pantalla"
                                    value={selectedPantalla.nombre_pantalla}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-group-label">Dirección</label>
                                <input
                                    type="text"
                                    name="direccion_pantalla"
                                    value={selectedPantalla.direccion_pantalla}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-group-label">Costo por Hora</label>
                                <input
                                    type="number"
                                    name="costoHora"
                                    value={selectedPantalla.costoHora}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-group-label">Duración</label>
                                <input
                                    type="number"
                                    name="duracion_pantalla"
                                    value={selectedPantalla.duracion_pantalla}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-group-label">Hora de Inicio</label>
                                <input
                                    type="time"
                                    name="hora_inicio"
                                    value={selectedPantalla.hora_inicio}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-group-label">Hora de Fin</label>
                                <input
                                    type="time"
                                    name="hora_fin"
                                    value={selectedPantalla.hora_fin}
                                    onChange={handleInputChange}
                                    className="form-group-input"
                                />
                            </div>
                            <div className="form-actions">
                                <button className="form-actions-submit-button" type="submit">Guardar Cambios</button>
                                <button type="button" className="form-actions-cancel-button" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <p className="pantalla-details-placeholder">Seleccione una pantalla para editar sus detalles.</p>
                )}
            </div>
        </div>
    );
}

export default AdminGestionPantallas;
