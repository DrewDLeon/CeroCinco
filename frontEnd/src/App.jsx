import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import MisCampañas from './pages/misCampañas/MisCampañas';
import Impactos from './pages/impactos/Impactos';
import CrearCampaña from './pages/crearCampaña/CrearCampaña';
import Admin from './pages/adminPruebas/admin';
import './App.css';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/miscampañas"
          element={
            <PrivateRoute>
              <MainLayout>
                <MisCampañas />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/crearcampañas"
          element={
            <PrivateRoute>
              <MainLayout>
                <CrearCampaña />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Impactos"
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
      </Routes>
    </Router>
  );
}

export default App;
