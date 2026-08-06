import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Partido {
    id: number | string;
    dia: string;
    mes: string;
    rival: string;
    categoria: string;
    hora: string;
    condicion: 'Local' | 'Visitante';
    estado: 'proximo' | 'jugado';
    resultado?: string;
}

const CalendarioCEO = () => {
    const [partidos, setPartidos] = useState<Partido[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartidosFromDB = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/partidos');
                if (response.ok) {
                    const data = await response.json();
                    setPartidos(data);
                }
            } catch (error) {
                console.error("Error al cargar partidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartidosFromDB();
    }, []);

    const proximosPartidos = partidos.filter(p => p.estado === 'proximo');
    const partidosJugados = partidos.filter(p => p.estado === 'jugado');

    return (
        <div className="fixed inset-0 flex bg-[#0b0f19] text-white font-sans overflow-hidden">
            
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0b0f19] p-8 space-y-8">
                
                <div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Panel de control</span>
                        <span>/</span>
                        <span className="text-white font-medium">CEO / Director</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Calendario de Partidos</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 text-emerald-400 font-bold">
                        Cargando calendario desde la base de datos...
                    </div>
                ) : (
                    <div className="space-y-10">
                        
                        {/* SECCIÓN: PRÓXIMOS */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Próximos</h2>
                            
                            <div className="space-y-3">
                                {proximosPartidos.length > 0 ? proximosPartidos.map((partido) => (
                                    <div 
                                        key={partido.id}
                                        className="bg-[#111622] border border-gray-800/80 hover:border-gray-700 transition rounded-2xl p-4 flex items-center justify-between shadow-lg"
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className="bg-[#161b22] border border-gray-800 rounded-xl px-3.5 py-2.5 text-center shrink-0 w-16">
                                                <span className="block text-lg font-bold text-white leading-none">{partido.dia}</span>
                                                <span className="block text-[10px] font-semibold text-gray-400 mt-1 uppercase">{partido.mes}</span>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-white text-base">{partido.rival}</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">{partido.categoria} · {partido.hora}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                                                partido.condicion === 'Local' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                                {partido.condicion}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-gray-500">No hay partidos próximos agendados.</p>
                                )}
                            </div>
                        </div>

                        {/* SECCIÓN: JUGADOS */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jugados</h2>
                            
                            <div className="space-y-3">
                                {partidosJugados.length > 0 ? partidosJugados.map((partido) => (
                                    <div 
                                        key={partido.id}
                                        className="bg-[#111622] border border-gray-800/80 hover:border-gray-700 transition rounded-2xl p-4 flex items-center justify-between shadow-lg opacity-90"
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className="bg-[#161b22] border border-gray-800 rounded-xl px-3.5 py-2.5 text-center shrink-0 w-16">
                                                <span className="block text-lg font-bold text-gray-300 leading-none">{partido.dia}</span>
                                                <span className="block text-[10px] font-semibold text-gray-500 mt-1 uppercase">{partido.mes}</span>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-gray-200 text-base">{partido.rival}</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">{partido.categoria} · {partido.hora}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <span className="bg-[#161b22] border border-gray-800 px-3 py-1.5 rounded-xl text-sm font-bold text-white tracking-wider shadow-inner">
                                                {partido.resultado}
                                            </span>
                                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                                                partido.condicion === 'Local' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                                {partido.condicion}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-gray-500">No hay registro de partidos jugados.</p>
                                )}
                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default CalendarioCEO;