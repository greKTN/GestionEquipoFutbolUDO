import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- Importamos la sidebar única
// ==========================================
// 🔌 PUNTO DE INTEGRACIÓN: Importar cliente de Supabase
// import { supabase } from '../supabase';
// import { useEffect } from 'react';
// ==========================================

const CategoriasCEO = () => {
    // Estado para los filtros superiores ('todas' | 'masculino' | 'femenino')
    const [filtroActivo, setFiltroActivo] = useState('todas');

    // ==========================================
    // 🔌 PUNTO DE INTEGRACIÓN CON BASE DE DATOS:
    // Aquí cargarías las categorías y entrenadores desde Supabase.
    // Ej: const [categorias, setCategorias] = useState([]);
    // useEffect(() => {
    //   async function fetchCategorias() {
    //     // const { data } = await supabase.from('categorias').select('*, entrenadores(nombre)');
    //     // setCategorias(data);
    //   }
    //   fetchCategorias();
    // }, []);
    // ==========================================

    // Listado completo de categorías (Mock data)
    const listadoCategorias = [
        // Masculino
        { id: 1, nombre: 'Sub-7', genero: 'Masculino', edad: '5–7 años', jugadores: 18, entrenador: 'Carlos Méndez' },
        { id: 2, nombre: 'Sub-9', genero: 'Masculino', edad: '8–9 años', jugadores: 22, entrenador: 'Roberto Fuentes' },
        { id: 3, nombre: 'Sub-11', genero: 'Masculino', edad: '10–11 años', jugadores: 20, entrenador: 'José Paredes' },
        { id: 4, nombre: 'Sub-13', genero: 'Masculino', edad: '12–13 años', jugadores: 22, entrenador: 'Miguel Torres' },
        { id: 5, nombre: 'Sub-15', genero: 'Masculino', edad: '14–15 años', jugadores: 20, entrenador: 'Andrés Vega' },
        { id: 6, nombre: 'Sub-17', genero: 'Masculino', edad: '16–17 años', jugadores: 20, entrenador: 'Luis Castillo' },
        { id: 7, nombre: 'Sub-20', genero: 'Masculino', edad: '18–20 años', jugadores: 22, entrenador: 'Fernando Ríos' },
        { id: 8, nombre: 'Primera', genero: 'Masculino', edad: '18+ años', jugadores: 24, entrenador: 'David Herrera' },
        
        // Femenino
        { id: 9, nombre: 'Sub-7', genero: 'Femenino', edad: '5–7 años', jugadores: 16, entrenador: 'María García' },
        { id: 10, nombre: 'Sub-9', genero: 'Femenino', edad: '8–9 años', jugadores: 18, entrenador: 'Ana Flores' },
        { id: 11, nombre: 'Sub-11', genero: 'Femenino', edad: '10–11 años', jugadores: 18, entrenador: 'Patricia Lima' },
        { id: 12, nombre: 'Sub-13', genero: 'Femenino', edad: '12–13 años', jugadores: 18, entrenador: 'Sandra Cruz' },
        { id: 13, nombre: 'Sub-15', genero: 'Femenino', edad: '14–15 años', jugadores: 20, entrenador: 'Carmen Reyes' },
        { id: 14, nombre: 'Sub-17', genero: 'Femenino', edad: '16–17 años', jugadores: 18, entrenador: 'Lucía Moreno' },
        { id: 15, nombre: 'Sub-20', genero: 'Femenino', edad: '18–20 años', jugadores: 20, entrenador: 'Isabel Vásquez' },
        { id: 16, nombre: 'Primera', genero: 'Femenino', edad: '18+ años', jugadores: 22, entrenador: 'Elena Ruiz' },
    ];

    // Lógica para filtrar las categorías según el botón seleccionado
    const categoriasFiltradas = listadoCategorias.filter(cat => {
        if (filtroActivo === 'masculino') return cat.genero === 'Masculino';
        if (filtroActivo === 'femenino') return cat.genero === 'Femenino';
        return true; // 'todas'
    });

    return (
        <div className="min-h-screen w-full flex bg-[#0b0f19] text-white font-sans">
            
            {/* ================= SIDEBAR UNIFICADA ================= */}
            <Sidebar />

            {/* ================= CONTENIDO PRINCIPAL ================= */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                
                {/* Navbar Superior */}
                <header className="h-16 border-b border-gray-800 px-8 flex items-center justify-between bg-[#0b0f19]/80 backdrop-blur sticky top-0 z-10">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>Panel de control</span>
                        <span>›</span>
                        <span className="text-white font-medium">CEO / Director</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full bg-[#161b22] border border-gray-800 text-gray-300 hover:text-white relative">
                            🔔
                            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <span>🛡️</span>
                            <span>CEO / Director</span>
                        </div>
                    </div>
                </header>

                {/* Cuerpo de la vista Categorías */}
                <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
                    
                    {/* Encabezado y Botones de Filtro Superior */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white">Categorías</h1>
                            <p className="text-sm text-gray-400 mt-1">Gestión y control de plantillas por categoría</p>
                        </div>

                        {/* Botones de Filtro (Todas / Masculino / Femenino) */}
                        <div className="flex items-center space-x-2 bg-[#111622] p-1.5 rounded-xl border border-gray-800">
                            <button
                                onClick={() => setFiltroActivo('todas')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                                    filtroActivo === 'todas'
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFiltroActivo('masculino')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                                    filtroActivo === 'masculino'
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Masculino
                            </button>
                            <button
                                onClick={() => setFiltroActivo('femenino')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                                    filtroActivo === 'femenino'
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Femenino
                            </button>
                        </div>
                    </div>

                    {/* Grilla de Tarjetas de Categorías */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 🔌 PUNTO DE INTEGRACIÓN: Mapear 'categoriasFiltradas' directo desde la base de datos */}
                        {categoriasFiltradas.map((cat) => (
                            <div 
                                key={cat.id} 
                                className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 relative overflow-hidden shadow-lg flex flex-col justify-between space-y-6 hover:border-gray-700 transition"
                            >
                                {/* Cabecera de la Tarjeta */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-black text-white">{cat.nombre}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">Edad: {cat.edad}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                        cat.genero === 'Masculino'
                                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                        : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                                    }`}>
                                        {cat.genero === 'Masculino' ? 'Masc.' : 'Fem.'}
                                    </span>
                                </div>

                                {/* Cuerpo / Estadísticas de la Tarjeta */}
                                <div className="space-y-3 pt-2 border-t border-gray-800/60">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 font-medium">Jugadores</span>
                                        <span className="text-sm font-bold text-white">{cat.jugadores}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 font-medium">Entrenador/a</span>
                                        <span className="text-sm font-semibold text-emerald-400 truncate max-w-[140px]">{cat.entrenador}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CategoriasCEO;