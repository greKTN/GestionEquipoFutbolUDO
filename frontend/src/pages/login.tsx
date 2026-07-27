import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ==========================================
// 🔌 PUNTO DE INTEGRACIÓN: Importar cliente de Supabase
// import { supabase } from '../supabase';
// ==========================================

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // ==========================================
        // 🔌 PUNTO DE INTEGRACIÓN CON SUPABASE AUTH:
        // try {
        //     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        //     if (error) throw error;
        //     navigate('/ceo');
        // } catch (err: any) {
        //     alert(err.message || 'Error al iniciar sesión');
        // } finally {
        //     setLoading(false);
        // }
        // ==========================================

        // Simulación temporal mientras configuras Supabase
        setTimeout(() => {
            setLoading(false);
            navigate('/ceo');
        }, 500);
    };

    // Función para acceso rápido directo sin credenciales
    const handleAccesoDirecto = () => {
        navigate('/ceo');
    };

    return (
        // Contenedor principal (asegura que no haya padding lateral por defecto)
        <div className="min-h-screen w-full flex flex-col md:flex-row font-sans bg-[#010409]">
        
        {/* 1. SECCIÓN IZQUIERDA: Banner Visual / Imagen */}
        <div className="hidden md:flex md:w-1/2 lg:w-1/2 relative bg-slate-900 min-h-screen">
            <img 
            src="/images/Equipo.png" 
            alt="Jugadores de Anzoategui SC" 
            className="absolute inset-0 w-full h-full object-contain" 
            />
            {/* Degradado sutil sobre la imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
        </div>

        {/* 2. SECCIÓN DERECHA: Formulario de Ingreso */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-16 lg:p-24 text-white min-h-screen">
            <div className="w-full max-w-lg space-y-12 my-auto">
            
            {/* Encabezado */}
            <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Anzoategui SC Academia de Futbol
                </h1>
                <p className="mt-3 text-slate-400 text-xl md:text-2xl">
                Sistema de Gestion Integral
                </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-8">
                
                {/* Campo Usuario */}
                <div className="space-y-3">
                <label htmlFor="username" className="block text-lg font-medium text-gray-200">
                    Usuario
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-6 py-5 bg-[#161b22] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-3 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-150 text-lg"
                    placeholder="Ingrese su usuario"
                />
                </div>

                {/* Campo Contraseña */}
                <div className="space-y-3">
                <label htmlFor="password" className="block text-lg font-medium text-gray-200">
                    Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-6 py-5 bg-[#161b22] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-3 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-150 text-lg"
                    placeholder="••••••••"
                />
                </div>

                {/* Campo Selección de Rol */}
                <div className="space-y-3">
                <label htmlFor="role" className="block text-lg font-medium text-gray-200">
                    Seleccione su Rol
                </label>
                <div className="relative">
                    <select
                    id="role"
                    name="role"
                    required
                    className="w-full pl-6 pr-12 py-5 appearance-none bg-[#161b22] border border-gray-600 rounded-xl text-white focus:ring-3 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-150 text-lg"
                    defaultValue=""
                    >
                    <option value="" disabled className="text-gray-400">Seleccione</option>
                    <option value="admin">Administrador</option>
                    <option value="entrenador">Entrenador</option>
                    <option value="jugador">Jugador</option>
                    <option value="representante">Representante</option>
                    </select>
                </div>
                </div>

                {/* Botón Ingresar */}
                <div className="pt-4 space-y-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-6 px-8 border border-transparent rounded-2xl shadow-xl text-xl font-bold text-white bg-[#ff6b00] hover:bg-[#e66000] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {loading ? 'INGRESANDO...' : 'INGRESAR'}
                    </button>

                    {/* Botón de Acceso Rápido / Demo */}
                    <button
                        type="button"
                        onClick={handleAccesoDirecto}
                        className="w-full flex items-center justify-center space-x-2 py-4 px-8 border border-gray-700 rounded-2xl shadow-md text-lg font-semibold text-gray-300 bg-[#161b22] hover:bg-gray-800 focus:outline-none transition duration-150"
                    >
                        <span>⚡</span>
                        <span>Acceso Directo (Demo CEO)</span>
                    </button>
                </div>
            </form>

            </div>
        </div>
        </div>
    );
};

export default Login;