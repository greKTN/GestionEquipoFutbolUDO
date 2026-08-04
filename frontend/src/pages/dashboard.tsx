import { useAuth } from "../components/authContext";
import Login from "./login"; // Importamos tu nuevo diseño de Login
import DashboardCEO from "./DashboardCEO"; // Importamos el panel real del CEO

export default function Dashboard() {
    const { session, rol, cargando } = useAuth();

    // 1. Pantalla de carga
    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-emerald-400">
                <p className="text-xl font-bold">Cargando sistema...</p>
            </div>
        );
    }
    
    // 2. Si no hay sesión, mostramos tu nueva pantalla de Login
    if (!session) {
        return <Login />;
    }
    
    // 3. ENRUTADOR DE ROLES: Dependiendo del rol, renderizamos el componente correcto
    if (rol === 'CEO') {
        return <DashboardCEO />;
    }

    if (rol === 'entrenador') {
        return (
            <div className="p-10 text-white">
                <h2>Panel de Entrenador (En construcción)</h2>
                {/* Aquí renderizarás <DashboardEntrenador /> cuando lo crees */}
            </div>
        );
    }

    // 4. Fallback si el rol no coincide
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white">
            <h2>Error: Permisos insuficientes o rol no reconocido ({rol}).</h2>
            <button 
                onClick={() => import('../supabase').then(m => m.supabase.auth.signOut())}
                className="mt-4 px-4 py-2 bg-red-600 rounded"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}