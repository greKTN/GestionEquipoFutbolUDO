import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const JugadoresCEO = () => {
    const [busqueda, setBusqueda] = useState('');
    
    // Estados para la DB
    const [jugadores, setJugadores] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchJugadores = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/jugadores/lista');
                if (response.ok) {
                    const data = await response.json();
                    setJugadores(data);
                }
            } catch (error) {
                console.error("Error al cargar jugadores:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchJugadores();
    }, []);

    const jugadoresFiltrados = jugadores.filter(j => 
        j.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        j.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
        j.posicion.toLowerCase().includes(busqueda.toLowerCase())
    );

    const getEstadoBadge = (estado: string) => {
        switch (estado) {
            case 'Activo': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Lesionado': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Suspendido': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getCuotaBadge = (cuota: string) => {
        switch (cuota) {
            case 'Pagado': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Vencido': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Pendiente': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="fixed inset-0 flex bg-[#0b0f19] text-white font-sans overflow-hidden">
            <Sidebar />

            {/* main ajustado para controlar el tamaño máximo */}
            <main className="flex-1 flex flex-col h-full bg-[#0b0f19] p-6 md:p-8 gap-6 overflow-hidden">
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 shrink-0">
                    <div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Panel de control</span>
                            <span>/</span>
                            <span className="text-white font-medium">CEO / Director</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Jugadores</h1>
                    </div>

                    <div className="relative w-full md:w-72">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar jugador..."
                            className="w-full bg-[#111622] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                        />
                    </div>
                </div>

                {/* Contenedor de la tabla optimizado con flex-1 y min-h-0 para forzar el scroll interno */}
                <div className="bg-[#111622] border border-gray-800/80 rounded-2xl shadow-xl flex-1 flex flex-col min-h-0">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse relative">
                            <thead className="sticky top-0 bg-[#111622] z-10 shadow-sm">
                                <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Jugador</th>
                                    <th className="py-4 px-6">Categoría</th>
                                    <th className="py-4 px-6">Estado</th>
                                    <th className="py-4 px-6">Cuota</th>
                                    <th className="py-4 px-6">Residencia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50 text-sm">
                                {cargando ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-emerald-400 font-bold">
                                            Cargando jugadores...
                                        </td>
                                    </tr>
                                ) : jugadoresFiltrados.length > 0 ? (
                                    jugadoresFiltrados.map((jugador) => (
                                        <tr key={jugador.id} className="hover:bg-gray-800/30 transition">
                                            <td className="py-4 px-6 flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                                                    {jugador.iniciales}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{jugador.nombre}</p>
                                                    <p className="text-xs text-gray-400">{jugador.posicion}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-300 font-medium">
                                                {jugador.categoria}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoBadge(jugador.estado)}`}>
                                                    {jugador.estado}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getCuotaBadge(jugador.cuota)}`}>
                                                    {jugador.cuota}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-xl text-xs font-medium ${
                                                    jugador.residencia === 'Residente' 
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                                    : 'text-gray-400 bg-gray-800/50 border border-gray-700/50'
                                                }`}>
                                                    {jugador.residencia}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                                            No se encontraron jugadores registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JugadoresCEO;