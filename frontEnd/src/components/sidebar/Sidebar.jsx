import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  //const isDashboardOrMisCampañas = location.pathname === '/miscampañas' || location.pathname === '/dashboard';

  return (
    <nav className="sidebar">
      <ul>
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
      </ul>
    </nav>
  );
}

export default Sidebar;
