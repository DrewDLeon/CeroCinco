import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import MisCampañas from './pages/misCampañas/MisCampañas';
import Impactos from './pages/impactos/Impactos';
import CrearCampaña from './pages/crearCampaña/CrearCampaña';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/miscampañas" element={
          <MainLayout>
            <MisCampañas />
          </MainLayout>
        } />
        <Route path="/crearcampañas" element={
          <MainLayout>
            <CrearCampaña />
          </MainLayout>
        } />
        <Route path="/Impactos" element={
          <MainLayout>
            <Impactos />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
