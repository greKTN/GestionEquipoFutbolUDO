import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Empleado {
    id: number | string;
    nombre: string;
    email: string;
    cargo: string;
    departamento: string;
    salario: number | string; // Puede llegar como string desde la BD
    estadoNomina: 'Pagada' | 'Pendiente' | string;
    iniciales: string;
}

const PersonalCEO = () => {
    // Estados para almacenar la data real y manejar la carga
    const [personal, setPersonal] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPersonalFromDB = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/personal');
                if (response.ok) {
                    const data = await response.json();
                    setPersonal(data);
                }
            } catch (error) {
                console.error("Error al cargar el personal:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalFromDB();
    }, []);

    const getNominaBadge = (estado: string) => {
        switch (estado) {
            case 'Pagada': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Pendiente': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="fixed inset-0 flex bg-[#0b0f19] text-white font-sans overflow-hidden">
            
            {/* Sidebar independiente */}
            <Sidebar />

            {/* main ajustado para controlar el tamaño máximo y el scroll */}
            <main className="flex-1 flex flex-col h-full bg-[#0b0f19] p-6 md:p-8 gap-6 overflow-hidden">
                
                {/* Cabecera / Migas de pan */}
                <div className="shrink-0">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Panel de control</span>
                        <span>/</span>
                        <span className="text-white font-medium">CEO / Director</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Personal</h1>
                </div>

                {/* Contenedor de la tabla optimizado con flex-1 y min-h-0 para forzar el scroll interno */}
                <div className="bg-[#111622] border border-gray-800/80 rounded-2xl shadow-xl flex-1 flex flex-col min-h-0">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse relative">
                            <thead className="sticky top-0 bg-[#111622] z-10 shadow-sm">
                                <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Nombre</th>
                                    <th className="py-4 px-6">Cargo</th>
                                    <th className="py-4 px-6">Departamento</th>
                                    <th className="py-4 px-6">Salario</th>
                                    <th className="py-4 px-6">Nómina</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-emerald-400 font-bold">
                                            Cargando personal desde la base de datos...
                                        </td>
                                    </tr>
                                ) : personal.length > 0 ? (
                                    personal.map((empleado) => (
                                        <tr key={empleado.id} className="hover:bg-gray-800/30 transition">
                                            {/* Columna Nombre con Avatar e Email */}
                                            <td className="py-4 px-6 flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                                                    {empleado.iniciales}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{empleado.nombre}</p>
                                                    <p className="text-xs text-gray-400">{empleado.email}</p>
                                                </div>
                                            </td>

                                            {/* Cargo */}
                                            <td className="py-4 px-6 text-gray-300 font-medium">
                                                {empleado.cargo}
                                            </td>

                                            {/* Departamento */}
                                            <td className="py-4 px-6 text-gray-400 text-xs">
                                                {empleado.departamento || 'No asignado'}
                                            </td>

                                            {/* Salario */}
                                            <td className="py-4 px-6 font-bold text-white">
                                                €{Number(empleado.salario).toLocaleString()}
                                            </td>

                                            {/* Nómina (Estado) */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getNominaBadge(empleado.estadoNomina)}`}>
                                                    {empleado.estadoNomina || 'Pendiente'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                                            No se encontró personal registrado.
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

export default PersonalCEO;