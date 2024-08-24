import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import MisCampanas from './pages/misCampanas/MisCampanas';
import Impactos from './pages/impactos/Impactos';
import CrearCampanas from './pages/crearCampana/CrearCampana';
import AdminCampanas from './pages/adminCampanas/AdminCampanas';
import AdminCrearUsuario from './pages/adminCrearUsuario/AdminCrearUsuario';
import AdminGestionUsuarios from './pages/adminGestionUsuarios/AdminGestionUsuarios';
import AdminGestionPantallas from './pages/adminGestionPantallas/AdminGestionPantallas';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import './App.css';

const RedirectBasedOnRole = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('admin');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === '2') {
    return <Navigate to="/OwnerDashboard" replace />;
  }

  if (role === '1') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/MisCampañas" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/MisCampañas"
          element={
            <PrivateRoute>
              <MainLayout>
                <MisCampanas />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/CrearCampañas"
          element={
            <PrivateRoute>
              <MainLayout>
                <CrearCampanas />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/impactos"
          element={
            <PrivateRoute>
              <MainLayout>
                <Impactos />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/adminCampanas"
          element={
            <PrivateRoute adminRoute>
              <MainLayout>
                <AdminCampanas />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/adminCrearUsuario"
          element={
            <PrivateRoute ownerRoute>
              <MainLayout>
                <AdminCrearUsuario />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/adminGestionUsuarios"
          element={
            <PrivateRoute ownerRoute>
              <MainLayout>
                <AdminGestionUsuarios />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/adminGestionPantallas"
          element={
            <PrivateRoute ownerRoute>
              <MainLayout>
                <AdminGestionPantallas />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Ruta catch-all para redirigir según el rol */}
        <Route
          path="*"
          element={<RedirectBasedOnRole />}
        />
      </Routes>
    </Router>
  );
}

export default App;
