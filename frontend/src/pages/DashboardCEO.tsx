import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardCEO = () => {
    // Valores fijos de ejemplo (Mock data)
    const statsData = {
        jugadores: 10,
        cuotasVencidas: 2,
        residentes: 7,
        proxPartidos: 5,
    };

    const categoriasMasculino = [
        { name: 'Sub-7', count: 18 },
        { name: 'Sub-9', count: 22 },
        { name: 'Sub-11', count: 20 },
        { name: 'Sub-13', count: 22 },
        { name: 'Sub-15', count: 20 },
        { name: 'Sub-17', count: 20 },
        { name: 'Sub-20', count: 22 },
        { name: 'Primera', count: 24 },
    ];

    const categoriasFemenino = [
        { name: 'Sub-7', count: 16 },
        { name: 'Sub-9', count: 18 },
        { name: 'Sub-11', count: 18 },
        { name: 'Sub-13', count: 18 },
        { name: 'Sub-15', count: 20 },
        { name: 'Sub-17', count: 18 },
        { name: 'Sub-20', count: 20 },
        { name: 'Primera', count: 22 },
    ];

    const partidosList = [
        { equipo: 'CD Villarreal B', categoria: 'Sub-17 Masc.', fecha: '27 jun 2026 11:00', tipo: 'Casa' },
        { equipo: 'Valencia CF Juvenil', categoria: 'Sub-20 Masc.', fecha: '28 jun 2026 17:00', tipo: 'Visitante' },
        { equipo: 'RCD Espanyol Sub-17', categoria: 'Sub-17 Fem.', fecha: '29 jun 2026 10:00', tipo: 'Casa' },
        { equipo: 'Atlético Madrid Sub-15', categoria: 'Sub-15 Masc.', fecha: '04 jul 2026 16:00', tipo: 'Visitante' },
        { equipo: 'Sevilla FC Sub-13', categoria: 'Sub-13 Masc.', fecha: '05 jul 2026 12:00', tipo: 'Casa' },
    ];

    return (
        <div className="fixed inset-0 flex bg-[#0b0f19] text-white font-sans overflow-hidden">
            
            {/* ================= SIDEBAR UNIFICADA ================= */}
            <Sidebar />

            {/* ================= CONTENIDO PRINCIPAL ================= */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0b0f19]">
                
                {/* Navbar Superior */}
                <header className="h-16 border-b border-gray-800 px-8 flex items-center justify-between bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-20">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="flex items-center text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
                            Panel de control
                        </span>
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

                {/* Cuerpo del Dashboard */}
                <div className="p-8 space-y-8 max-w-7xl mx-auto w-full pb-16">
                    
                    {/* Título de Sección */}
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Resumen General</h1>
                        <p className="text-sm text-gray-400 mt-1">Temporada 2025/26 · Actualizado hoy</p>
                    </div>

                    {/* Tarjetas de Estadísticas Principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* 1. Jugadores */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-400">Jugadores</span>
                                <span className="text-emerald-400 bg-emerald-500/10 p-2 rounded-xl">👥</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-4xl font-black text-emerald-400">{statsData.jugadores}</h3>
                                <p className="text-xs text-gray-400 mt-1">en la academia</p>
                            </div>
                        </div>

                        {/* 2. Cuotas Vencidas */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-400">Cuotas Vencidas</span>
                                <span className="text-red-400 bg-red-500/10 p-2 rounded-xl">⚠️</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-4xl font-black text-red-500">{statsData.cuotasVencidas}</h3>
                                <p className="text-xs text-gray-400 mt-1">requieren atención</p>
                            </div>
                        </div>

                        {/* 3. Residentes */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-400">Residentes</span>
                                <span className="text-sky-400 bg-sky-500/10 p-2 rounded-xl">🏠</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-4xl font-black text-sky-400">{statsData.residentes}</h3>
                                <p className="text-xs text-gray-400 mt-1">en instalaciones</p>
                            </div>
                        </div>

                        {/* 4. Próx. Partidos */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-400">Próx. Partidos</span>
                                <span className="text-amber-400 bg-amber-500/10 p-2 rounded-xl">📅</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-4xl font-black text-amber-400">{statsData.proxPartidos}</h3>
                                <p className="text-xs text-gray-400 mt-1">esta semana</p>
                            </div>
                        </div>

                    </div>

                    {/* Grilla Inferior: Estado de Categorías y Próximos Partidos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Estado de Categorías */}
                        <div className="lg:col-span-2 bg-[#111622] border border-gray-800/80 rounded-2xl p-6 space-y-6 shadow-lg">
                            <div className="flex items-center space-x-2 text-lg font-bold text-white">
                                <span className="text-emerald-400">📈</span>
                                <h2>Estado de Categorías</h2>
                            </div>

                            {/* Masculino */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Masculino</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {categoriasMasculino.map((cat, i) => (
                                        <div key={i} className="bg-[#161b22] border border-gray-800/60 p-4 rounded-xl text-center hover:border-gray-700 transition">
                                            <p className="text-2xl font-black text-white">{cat.count}</p>
                                            <p className="text-xs text-gray-400 mt-1">{cat.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Femenino */}
                            <div className="space-y-3 pt-2">
                                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Femenino</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {categoriasFemenino.map((cat, i) => (
                                        <div key={i} className="bg-[#161b22] border border-gray-800/60 p-4 rounded-xl text-center hover:border-gray-700 transition">
                                            <p className="text-2xl font-black text-white">{cat.count}</p>
                                            <p className="text-xs text-gray-400 mt-1">{cat.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Próximos Partidos */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-2 text-lg font-bold text-white mb-4">
                                    <span className="text-amber-400">📅</span>
                                    <h2>Próximos Partidos</h2>
                                </div>

                                <div className="space-y-3">
                                    {partidosList.map((partido, i) => (
                                        <div key={i} className="p-3 bg-[#161b22] border border-gray-800/60 rounded-xl flex items-center justify-between">
                                            <div className="overflow-hidden pr-2">
                                                <p className="text-sm font-bold text-white truncate">{partido.equipo}</p>
                                                <p className="text-[11px] text-gray-400">{partido.categoria} · {partido.fecha}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 ${
                                                partido.tipo === 'Casa' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                            }`}>
                                                {partido.tipo}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Alerta Médica Activa */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center space-x-4 shadow-lg">
                        <div className="p-3 bg-red-500/20 rounded-xl text-red-400 text-xl shrink-0">
                            ⚠️
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-400">Alertas médicas activas</h4>
                            <p className="text-xs text-gray-300 mt-0.5">Diego Morales — revisión pendiente con fisio</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardCEO;