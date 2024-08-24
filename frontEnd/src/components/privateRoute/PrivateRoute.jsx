import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

const PrivateRoute = ({ children, adminRoute, ownerRoute }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('admin'); // '0' para user, '1' para admin, '2' para owner

  if (!token || isTokenExpired(token)) {
    alert('Tu sesión ha expirado, favor de loggearse de nuevo.');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (adminRoute && role !== '1') {
    return <Navigate to="/miscampañas" state={{ from: location }} />;
  }

  if (ownerRoute && role !== '2') {
    return <Navigate to="/miscampañas" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
