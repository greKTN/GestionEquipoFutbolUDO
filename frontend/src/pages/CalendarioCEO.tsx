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
    // Estado preparado para la futura conexión con la Base de Datos (ej. Supabase)
    const [partidos, setPartidos] = useState<Partido[]>([
        // Próximos
        { id: 1, dia: '27', mes: 'JUN', rival: 'CD Villarreal B', categoria: 'Sub-17 Masc.', hora: '11:00h', condicion: 'Local', estado: 'proximo' },
        { id: 2, dia: '28', mes: 'JUN', rival: 'Valencia CF Juvenil', categoria: 'Sub-20 Masc.', hora: '17:00h', condicion: 'Visitante', estado: 'proximo' },
        { id: 3, dia: '29', mes: 'JUN', rival: 'RCD Espanyol Sub-17', categoria: 'Sub-17 Fem.', hora: '10:00h', condicion: 'Local', estado: 'proximo' },
        { id: 4, dia: '4', mes: 'JUL', rival: 'Atlético Madrid Sub-15', categoria: 'Sub-15 Masc.', hora: '16:00h', condicion: 'Visitante', estado: 'proximo' },
        { id: 5, dia: '5', mes: 'JUL', rival: 'Sevilla FC Sub-13', categoria: 'Sub-13 Masc.', hora: '12:00h', condicion: 'Local', estado: 'proximo' },
        // Jugados
        { id: 6, dia: '19', mes: 'JUN', rival: 'Real Betis Juvenil', categoria: 'Sub-17 Masc.', hora: '17:00h', condicion: 'Local', estado: 'jugado', resultado: '3-1' },
        { id: 7, dia: '14', mes: 'JUN', rival: 'Getafe CF Sub-20', categoria: 'Sub-20 Masc.', hora: '11:00h', condicion: 'Visitante', estado: 'jugado', resultado: '0-2' },
        { id: 8, dia: '9', mes: 'JUN', rival: 'FC Barcelona B Fem.', categoria: 'Sub-17 Fem.', hora: '10:00h', condicion: 'Visitante', estado: 'jugado', resultado: '1-1' },
    ]);

    const [loading, setLoading] = useState(false);

    // Simulación de llamada a base de datos (Ej: useEffect con Supabase)
    useEffect(() => {
        const fetchPartidosFromDB = async () => {
            setLoading(true);
            try {
                // AQUÍ HARÁS TU CONSULTA A LA BASE DE DATOS:
                // const { data, error } = await supabase.from('partidos').select('*');
                // if (data) setPartidos(data);
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
            
            {/* Sidebar independiente */}
            <Sidebar />

            {/* Contenido principal con scroll */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0b0f19] p-8 space-y-8">
                
                {/* Cabecera / Migas de pan */}
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
                    <div className="flex justify-center items-center py-20 text-gray-400 text-sm">
                        Cargando calendario desde la base de datos...
                    </div>
                ) : (
                    <div className="space-y-10">
                        
                        {/* SECCIÓN: PRÓXIMOS */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Próximos</h2>
                            
                            <div className="space-y-3">
                                {proximosPartidos.map((partido) => (
                                    <div 
                                        key={partido.id}
                                        className="bg-[#111622] border border-gray-800/80 hover:border-gray-700 transition rounded-2xl p-4 flex items-center justify-between shadow-lg"
                                    >
                                        <div className="flex items-center space-x-6">
                                            {/* Fecha (Día / Mes) */}
                                            <div className="bg-[#161b22] border border-gray-800 rounded-xl px-3.5 py-2.5 text-center shrink-0 w-16">
                                                <span className="block text-lg font-bold text-white leading-none">{partido.dia}</span>
                                                <span className="block text-[10px] font-semibold text-gray-400 mt-1 uppercase">{partido.mes}</span>
                                            </div>

                                            {/* Detalles del Partido */}
                                            <div>
                                                <h3 className="font-bold text-white text-base">{partido.rival}</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">{partido.categoria} · {partido.hora}</p>
                                            </div>
                                        </div>

                                        {/* Condición (Local / Visitante) */}
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
                                ))}
                            </div>
                        </div>

                        {/* SECCIÓN: JUGADOS */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jugados</h2>
                            
                            <div className="space-y-3">
                                {partidosJugados.map((partido) => (
                                    <div 
                                        key={partido.id}
                                        className="bg-[#111622] border border-gray-800/80 hover:border-gray-700 transition rounded-2xl p-4 flex items-center justify-between shadow-lg opacity-90"
                                    >
                                        <div className="flex items-center space-x-6">
                                            {/* Fecha (Día / Mes) */}
                                            <div className="bg-[#161b22] border border-gray-800 rounded-xl px-3.5 py-2.5 text-center shrink-0 w-16">
                                                <span className="block text-lg font-bold text-gray-300 leading-none">{partido.dia}</span>
                                                <span className="block text-[10px] font-semibold text-gray-500 mt-1 uppercase">{partido.mes}</span>
                                            </div>

                                            {/* Detalles del Partido */}
                                            <div>
                                                <h3 className="font-bold text-gray-200 text-base">{partido.rival}</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">{partido.categoria} · {partido.hora}</p>
                                            </div>
                                        </div>

                                        {/* Resultado y Condición */}
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
                                ))}
                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default CalendarioCEO;