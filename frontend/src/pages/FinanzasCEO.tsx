import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface FinanzasData {
    ingresosMes: number;
    cobrado: number;
    porCobrar: number;
    nominas: number;
    pagosEstado: {
        pagado: { monto: number; porcentaje: number };
        pendiente: { monto: number; porcentaje: number };
        vencido: { monto: number; porcentaje: number };
    };
}

const FinanzasCEO = () => {
    // Estado preparado para la futura conexión con la Base de Datos (ej. Supabase)
    const [finanzas, setFinanzas] = useState<FinanzasData>({
        ingresosMes: 3470,
        cobrado: 2400,
        porCobrar: 1070,
        nominas: 22300,
        pagosEstado: {
            pagado: { monto: 2400, porcentaje: 69 },
            pendiente: { monto: 400, porcentaje: 12 },
            vencido: { monto: 670, porcentaje: 19 },
        }
    });

    const [loading, setLoading] = useState(false);

    // Simulación de llamada a base de datos
    useEffect(() => {
        const fetchFinanzasFromDB = async () => {
            setLoading(true);
            try {
                // AQUÍ HARÁS TU CONSULTA A LA BASE DE DATOS:
                // const { data, error } = await supabase.from('finanzas').select('*').single();
                // if (data) setFinanzas(data);
            } catch (error) {
                console.error("Error al cargar datos financieros:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFinanzasFromDB();
    }, []);

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
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Finanzas</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 text-gray-400 text-sm">
                        Cargando datos financieros desde la base de datos...
                    </div>
                ) : (
                    <div className="space-y-8">
                        
                        {/* Tarjetas de Métricas Principales */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            {/* Ingresos Mes */}
                            <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-400">Ingresos Mes</span>
                                    <span className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">€{finanzas.ingresosMes}</h2>
                                    <p className="text-xs text-gray-400 mt-1">mensualidades totales</p>
                                </div>
                            </div>

                            {/* Cobrado */}
                            <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-400">Cobrado</span>
                                    <span className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">€{finanzas.cobrado}</h2>
                                    <p className="text-xs text-gray-400 mt-1">pagos confirmados</p>
                                </div>
                            </div>

                            {/* Por Cobrar */}
                            <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-400">Por Cobrar</span>
                                    <span className="text-amber-400 bg-amber-500/10 p-1.5 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">€{finanzas.porCobrar}</h2>
                                    <p className="text-xs text-gray-400 mt-1">pendiente/vencido</p>
                                </div>
                            </div>

                            {/* Nóminas */}
                            <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-400">Nóminas</span>
                                    <span className="text-blue-400 bg-blue-500/10 p-1.5 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">€{finanzas.nominas.toLocaleString()}</h2>
                                    <p className="text-xs text-gray-400 mt-1">coste total personal</p>
                                </div>
                            </div>

                        </div>

                        {/* Sección: Resumen por estado de pago */}
                        <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                            <h2 className="text-base font-bold text-white">Resumen por estado de pago</h2>

                            <div className="space-y-6">
                                
                                {/* Pagado */}
                                <div className="flex items-center justify-between">
                                    <div className="w-32 text-sm font-medium text-gray-300">Pagado</div>
                                    <div className="flex-1 mx-6 bg-[#161b22] h-3 rounded-full overflow-hidden border border-gray-800">
                                        <div 
                                            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${finanzas.pagosEstado.pagado.porcentaje}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-24 text-right">
                                        <span className="text-sm font-bold text-white">€{finanzas.pagosEstado.pagado.monto}</span>
                                        <span className="text-xs text-gray-400 block">({finanzas.pagosEstado.pagado.porcentaje}%)</span>
                                    </div>
                                </div>

                                {/* Pendiente */}
                                <div className="flex items-center justify-between">
                                    <div className="w-32 text-sm font-medium text-gray-300">Pendiente</div>
                                    <div className="flex-1 mx-6 bg-[#161b22] h-3 rounded-full overflow-hidden border border-gray-800">
                                        <div 
                                            className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${finanzas.pagosEstado.pendiente.porcentaje}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-24 text-right">
                                        <span className="text-sm font-bold text-white">€{finanzas.pagosEstado.pendiente.monto}</span>
                                        <span className="text-xs text-gray-400 block">({finanzas.pagosEstado.pendiente.porcentaje}%)</span>
                                    </div>
                                </div>

                                {/* Vencido */}
                                <div className="flex items-center justify-between">
                                    <div className="w-32 text-sm font-medium text-gray-300">Vencido</div>
                                    <div className="flex-1 mx-6 bg-[#161b22] h-3 rounded-full overflow-hidden border border-gray-800">
                                        <div 
                                            className="bg-red-500 h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${finanzas.pagosEstado.vencido.porcentaje}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-24 text-right">
                                        <span className="text-sm font-bold text-white">€{finanzas.pagosEstado.vencido.monto}</span>
                                        <span className="text-xs text-gray-400 block">({finanzas.pagosEstado.vencido.porcentaje}%)</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default FinanzasCEO;