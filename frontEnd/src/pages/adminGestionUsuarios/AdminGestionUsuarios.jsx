import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./AdminGestionUsuarios.css";

function AdminGestionUsuarios() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [filterUsername, setFilterUsername] = useState('');
    const [filterAdmin, setFilterAdmin] = useState(''); // '', '1' para admin, '0' para no admin

    useEffect(() => {
        async function fetchUsers() {
            try {
                const url = import.meta.env.VITE_API_URL + "/api/adminCrearUsuarios/";
                const response = await axios.get(url);
                setUsers(response.data[0]);
            } catch (error) {
                console.log("Error recolectando usuarios " + error);
            }
        }

        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUserId(user.id_usuario);
        setEditedUser(user);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSaveClick = async (userId) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/adminCrearUsuarios/${userId}`;
            await axios.put(url, editedUser);
            setUsers(users.map(user => user.id_usuario === userId ? editedUser : user));
            setEditingUserId(null);
        } catch (error) {
            console.log("Error guardando los cambios " + error);
        }
    };

    const handleCancelClick = () => {
        setEditingUserId(null);
        setEditedUser({});
    };

    const handleDeleteClick = async (userId) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/adminCrearUsuarios/${userId}`;
            await axios.delete(url);
            setUsers(users.filter(user => user.id_usuario !== userId));
        } catch (error) {
            console.log("Error eliminando el usuario " + error);
        }
    };

    const filteredUsers = users.filter(user => {
        return (
            user.usuario.toLowerCase().includes(filterUsername.toLowerCase()) &&
            (filterAdmin === '' || user.admin === parseInt(filterAdmin))
        );
    });

    return (
        <div className="gestion-usuarios-container">
            <h2>Gestión de Usuarios</h2>
            <div className="gestion-usuarios-filters">
                <input
                    type="text"
                    placeholder="Filtrar por nombre de usuario"
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}
                    className="gestion-usuarios-filter-input"
                />
                <select
                    value={filterAdmin}
                    onChange={(e) => setFilterAdmin(e.target.value)}
                    className="gestion-usuarios-filter-select"
                >
                    <option value="">Todos</option>
                    <option value="1">Administradores</option>
                    <option value="0">No Administradores</option>
                </select>
            </div>
            <table className="gestion-usuarios-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Admin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id_usuario}>
                            <td>
                                {editingUserId === user.id_usuario ? (
                                    <input
                                        type="text"
                                        name="usuario"
                                        value={editedUser.usuario}
                                        onChange={handleInputChange}
                                        className="gestion-usuarios-input"
                                    />
                                ) : (
                                    user.usuario
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id_usuario ? (
                                    <input
                                        type="text"
                                        name="contra"
                                        value={editedUser.contra}
                                        onChange={handleInputChange}
                                        className="gestion-usuarios-input"
                                    />
                                ) : (
                                    user.contra
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id_usuario ? (
                                    <input
                                        type="checkbox"
                                        name="admin"
                                        checked={editedUser.admin === 1}
                                        onChange={(e) =>
                                            handleInputChange({
                                                target: {
                                                    name: 'admin',
                                                    value: e.target.checked ? 1 : 0,
                                                }
                                            })
                                        }
                                        className="gestion-usuarios-checkbox"
                                    />
                                ) : (
                                    user.admin ? 'Sí' : 'No'
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id_usuario ? (
                                    <>
                                        <button 
                                            className="gestion-usuarios-save-button"
                                            onClick={() => handleSaveClick(user.id_usuario)}>
                                            Guardar
                                        </button>
                                        <button 
                                            className="gestion-usuarios-cancel-button"
                                            onClick={handleCancelClick}>
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            className="gestion-usuarios-edit-button"
                                            onClick={() => handleEditClick(user)}>
                                            Editar
                                        </button>
                                        <button 
                                            className="gestion-usuarios-delete-button"
                                            onClick={() => handleDeleteClick(user.id_usuario)}>
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminGestionUsuarios;
