import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  console.log('localStorage:', localStorage);
  const isAdmin = localStorage.getItem('admin') === '1';
  console.log('isAdmin:', isAdmin);
  console.log('localStorage.getItem(admin):', localStorage.getItem('admin'));

  return (
    <nav className="sidebar">
      <ul>
        {/*Navbar items cuando el perfil es admin*/}
        {isAdmin && (
          <>
            <li className="sidebar-list-item-container">
              <NavLink
                to="/admin"
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
