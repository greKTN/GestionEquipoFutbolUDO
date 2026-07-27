import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import DashboardCEO from './pages/DashboardCEO';
import CategoriasCEO from './pages/CategoriasCEO';
import JugadoresCEO from './pages/JugadoresCEO';
import CalendarioCEO from './pages/CalendarioCEO';
import FinanzasCEO from './pages/FinanzasCEO';
import PersonalCEO from './pages/PersonalCEO';

function App() {
  return (
    <Routes>
      {/* Ruta inicial / Login */}
      <Route path="/" element={<Login />} />

      {/* Vistas conectadas a la Sidebar */}
      <Route path="/ceo" element={<DashboardCEO />} />
      <Route path="/ceo/categorias" element={<CategoriasCEO />} />

      {/* 2. Añade la ruta correspondiente cada vez que crees un archivo nuevo: */}
      <Route path="/ceo/jugadores" element={<JugadoresCEO />} /> 
      <Route path="/ceo/calendario" element={<CalendarioCEO />} /> 
      <Route path="/ceo/finanzas" element={<FinanzasCEO />} /> 
      <Route path="/ceo/personal" element={<PersonalCEO />} /> 
      
      {/* Redirección por defecto ante rutas inválidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;