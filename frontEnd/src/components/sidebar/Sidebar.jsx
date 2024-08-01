import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const isAdmin = localStorage.getItem('admin') === '1';

  return (
    <nav className="sidebar">
      <ul>
        {/*Navbar items cuando el perfil es admin*/}
        {isAdmin && (
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
        {/*Navbar items cuando el perfil no es admin*/}
        {!isAdmin && (
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
