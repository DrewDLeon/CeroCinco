import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import MisCampanas from './pages/misCampanas/MisCampanas';
import Impactos from './pages/impactos/Impactos';
import CrearCampanas from './pages/crearCampana/CrearCampana';
import Admin from './pages/adminPruebas/admin';
import './App.css';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const RedirectBasedOnRole = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('admin') === '1';

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/MisCampañas" replace />;
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
          path="/admin"
          element={
            <PrivateRoute adminRoute>
              <MainLayout>
                <Admin />
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
