import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, adminRoute }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('admin') === '1';

  if (!token) {
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
