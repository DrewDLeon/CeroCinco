import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const role = localStorage.getItem('admin'); // El rol es '0' para user, '1' para admin, '2' para owner

  return (
    <nav className="sidebar">
      <ul>
        {/* Navbar items para el perfil 'owner' */}
        {role === '2' && (
          <>
            <li className="sidebar-list-item-container">
              <NavLink
                to="/adminCrearUsuario"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Crear usuario
              </NavLink>
            </li>
            <li className="sidebar-list-item-container">
              <NavLink
                to="/adminGestionUsuarios"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Gestionar Usuarios
              </NavLink>
            </li>
            <li className="sidebar-list-item-container">
              <NavLink 
                to="/adminGestionPantallas" 
                className={({ isActive }) => isActive ? 'active' : ''}>
                Gestionar Pantallas
              </NavLink>
            </li>
          </>
        )}
        {/* Navbar items para el perfil 'admin' */}
        {role === '1' && (
          <>
            <li className="sidebar-list-item-container">
              <NavLink
                to="/AdminCampanas"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Admin Panel
              </NavLink>
            </li>
          </>
        )}
        {/* Navbar items para el perfil 'user' */}
        {role === '0' && (
          <>
            <li className="sidebar-list-item-container">
              <NavLink 
                to="/miscampañas" 
                className={({ isActive }) => isActive ? 'active' : '' }>
                Mis Campañas
              </NavLink>
            </li>
            <li className="sidebar-list-item-container">
              <NavLink 
                to="/crearcampañas" 
                className={({ isActive }) => isActive ? 'active' : ''}>
                Crear Campaña
              </NavLink>
            </li>
            <li className="sidebar-list-item-container">
              <NavLink 
                to="/Impactos" 
                className={({ isActive }) => isActive ? 'active' : ''}>
                Impactos
              </NavLink>
            </li>
          </>       
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;
