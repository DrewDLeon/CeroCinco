import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminRoute }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('admin') === '1';
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to="/miscampañas" />;
  }

  return children;
};

export default PrivateRoute;
