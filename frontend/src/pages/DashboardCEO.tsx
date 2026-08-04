import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../components/authContext';


const DashboardCEO = () => {
    const { session } = useAuth(); 
    
    const [statsData, setStatsData] = useState({
        jugadores: 0,
        cuotasVencidas: 0,
        residentes: 0,
        proxPartidos: 0,
    });
    const [conectadoDB, setConectadoDB] = useState(false);

    const [categoriasMasculino, setCategoriasMasculino] = useState<any[]>([]);
    const [categoriasFemenino, setCategoriasFemenino] = useState<any[]>([]);
    const [partidosList, setPartidosList] = useState<any[]>([]);

    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Pedimos las 3 rutas al mismo tiempo para mayor velocidad
                const [resStats, resCat, resPart] = await Promise.all([
                    fetch('http://localhost:3000/api/dashboard/stats'),
                    fetch('http://localhost:3000/api/categorias'),
                    fetch('http://localhost:3000/api/partidos')
                ]);

                if (resStats.ok && resCat.ok && resPart.ok) {
                    const dataStats = await resStats.json();
                    const dataCat = await resCat.json();
                    const dataPart = await resPart.json();

                    //Llenado de las stats principàles
                    setStatsData(dataStats.statsPrincipales);
                    setConectadoDB(true);

                    //Filtrado de las categorías por género para mas organizacion
                    setCategoriasMasculino(dataCat.filter((c: any) => c.genero == 'Masculino'));
                    setCategoriasFemenino(dataCat.filter((c: any) => c.genero == 'Femenino'));

                    //Filtramos solo los partidos "próximos" y tomamos los primeros 5
                    const proximos = dataPart.filter((p: any) => p.estado == 'proximo').slice(0, 5);
                    setPartidosList(proximos);
                }
            } catch (error) {
                console.error("Error conectando a la base de datos:", error);
                setConectadoDB(false);
            }
        };

        fetchDashboardData();
    }, []);

    

    return (
        <div className="fixed inset-0 flex bg-[#0b0f19] text-white font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0b0f19]">
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
                        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                            {session?.user?.email || 'Usuario de prueba'}
                        </span>
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <span>🛡️</span>
                            <span>CEO / Director</span>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 max-w-7xl mx-auto w-full pb-16">
                    
                    {/* Banners de Prueba */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-400 text-sm font-bold shadow-lg">
                            ✅ Supabase Auth: Conectado como {session?.user?.email}
                        </div>
                        <div className={`flex-1 p-4 rounded-xl text-sm font-bold shadow-lg ${conectadoDB ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                            {conectadoDB ? '✅ PostgreSQL: Data completa en tiempo real' : '❌ PostgreSQL: Esperando conexión...'}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Resumen General</h1>
                        <p className="text-sm text-gray-400 mt-1">Temporada 2025/26 · Actualizado en tiempo real</p>
                    </div>

                    {/* Tarjetas de Estadísticas Principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-400">Próx. Partidos</span>
                                <span className="text-amber-400 bg-amber-500/10 p-2 rounded-xl">📅</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-4xl font-black text-amber-400">{statsData.proxPartidos}</h3>
                                <p className="text-xs text-gray-400 mt-1">agendados</p>
                            </div>
                        </div>
                    </div>

                    {/* Grilla Inferior (YA CONECTADA A LA BD) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-[#111622] border border-gray-800/80 rounded-2xl p-6 space-y-6 shadow-lg">
                            <div className="flex items-center space-x-2 text-lg font-bold text-white">
                                <span className="text-emerald-400">📈</span>
                                <h2>Estado de Categorías</h2>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Masculino</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {categoriasMasculino.map((cat, i) => (
                                        <div key={i} className="bg-[#161b22] border border-gray-800/60 p-4 rounded-xl text-center hover:border-gray-700 transition flex flex-col justify-center">
                                            <p className="text-2xl font-black text-white">{cat.jugadores}</p>
                                            <p className="text-[11px] text-gray-400 mt-1">{cat.nombre}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Femenino */}
                            <div className="space-y-3 pt-2">
                                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Femenino</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {categoriasFemenino.map((cat, i) => (
                                        <div key={i} className="bg-[#161b22] border border-gray-800/60 p-4 rounded-xl text-center hover:border-gray-700 transition flex flex-col justify-center">
                                            <p className="text-2xl font-black text-white">{cat.jugadores}</p>
                                            <p className="text-[11px] text-gray-400 mt-1">{cat.nombre}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-2 text-lg font-bold text-white mb-4">
                                    <span className="text-amber-400">📅</span>
                                    <h2>Próximos Partidos</h2>
                                </div>
                                <div className="space-y-3">
                                    {partidosList.length > 0 ? partidosList.map((partido, i) => (
                                        <div key={i} className="p-3 bg-[#161b22] border border-gray-800/60 rounded-xl flex items-center justify-between">
                                            <div className="overflow-hidden pr-2">
                                                <p className="text-sm font-bold text-white truncate">{partido.rival}</p>
                                                <p className="text-[11px] text-gray-400">{partido.categoria} · {partido.dia} {partido.mes} {partido.hora}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 ${
                                                partido.condicion === 'Local' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                            }`}>
                                                {partido.condicion}
                                            </span>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No hay partidos próximos agendados.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardCEO;