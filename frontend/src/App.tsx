import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/authContext'; // Ajusta la ruta si es 'componentes'
import { supabase } from './supabase';

//Páginas
import Login from './pages/login';
import DashboardCEO from './pages/DashboardCEO';
import CategoriasCEO from './pages/CategoriasCEO';
import JugadoresCEO from './pages/JugadoresCEO';
import CalendarioCEO from './pages/CalendarioCEO';
import FinanzasCEO from './pages/FinanzasCEO';
import PersonalCEO from './pages/PersonalCEO';


const RutaPrivada = ({ children, rolRequerido }: { children: React.ReactNode, rolRequerido: string }) => {
    const { session, rol, cargando } = useAuth();

    // Mientras busca en la base de datos, mostramos pantalla de carga
    if (cargando) {
        return <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-emerald-400 font-bold text-xl">Cargando sistema...</div>;
    }

    //Si no hay sesión iniciada, se le manda al Login
    if (!session) {
        return <Navigate to="/" replace />;
    }

    //Si tiene sesión pero su rol no coincide (Ej. Un jugador queriendo ver Finanzas)
    if (rol !== rolRequerido) {
        return <Navigate to="/" replace />;
    }


    return children;
};

function App() {
  const { session, rol, cargando } = useAuth();

  return (
    <Routes>
      {/* Ruta Principal Inteligente */}
      <Route 
        path="/" 
        element={
            cargando ? (
                <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-emerald-400 font-bold text-xl">
                    Validando sesión...
                </div>
            ) : session ? (
                rol === 'CEO' ? (
                    <Navigate to="/ceo" replace />
                ) : (
                    //PANTALLA DE DESATASCO (pro si hay algun bug al iniciar sesion)
                    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white">
                        <h2 className="text-2xl font-bold text-red-500 mb-2">Error: Cuenta no vinculada</h2>
                        <p className="text-gray-400">Rol detectado: {rol || 'Ninguno'}</p>
                        <p className="text-gray-400 mt-2">Tu usuario en Supabase no coincide con la base de datos local.</p>
                        <button 
                            onClick={() => supabase.auth.signOut()}
                            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition"
                        >
                            Cerrar Sesión Fantasma
                        </button>
                    </div>
                )
            ) : (
                <Login />
            )
        } 
      />


      {/* --- VISTAS DEL CEO (PROTEGIDAS) --- */}
      <Route path="/ceo" element={<RutaPrivada rolRequerido="CEO"><DashboardCEO /></RutaPrivada>} />
      <Route path="/ceo/categorias" element={<RutaPrivada rolRequerido="CEO"><CategoriasCEO /></RutaPrivada>} />
      <Route path="/ceo/jugadores" element={<RutaPrivada rolRequerido="CEO"><JugadoresCEO /></RutaPrivada>} /> 
      <Route path="/ceo/calendario" element={<RutaPrivada rolRequerido="CEO"><CalendarioCEO /></RutaPrivada>} /> 
      <Route path="/ceo/finanzas" element={<RutaPrivada rolRequerido="CEO"><FinanzasCEO /></RutaPrivada>} /> 
      <Route path="/ceo/personal" element={<RutaPrivada rolRequerido="CEO"><PersonalCEO /></RutaPrivada>} /> 
      
      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;