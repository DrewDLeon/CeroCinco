import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

const PrivateRoute = ({ children, adminRoute }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('admin') === '1';

  if (!token || isTokenExpired(token)) {
    alert('Tu sesión ha expirado, favor de loggearse de nuevo.');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to="/miscampañas" state={{ from: location }} />;
  }

  if (!adminRoute && isAdmin) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
