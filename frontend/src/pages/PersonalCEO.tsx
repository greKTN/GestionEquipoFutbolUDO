import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Empleado {
    id: number | string;
    nombre: string;
    email: string;
    cargo: string;
    departamento: string;
    salario: number;
    estadoNomina: 'Pagada' | 'Pendiente';
    iniciales: string;
}

const PersonalCEO = () => {
    // Estado preparado para la futura conexión con la Base de Datos (ej. Supabase)
    const [personal, setPersonal] = useState<Empleado[]>([
        { id: 1, nombre: 'Roberto García', email: 'director@academia.com', cargo: 'CEO / Director', departamento: 'Dirección', salario: 5000, estadoNomina: 'Pagada', iniciales: 'RG' },
        { id: 2, nombre: 'Laura Mendoza', email: 'lmendoza@academia.com', cargo: 'Jefa de RRHH', departamento: 'Recursos Humanos', salario: 2800, estadoNomina: 'Pagada', iniciales: 'LM' },
        { id: 3, nombre: 'Luis Castillo', email: 'lcastillo@academia.com', cargo: 'Entrenador Sub-17 M', departamento: 'Cuerpo Técnico', salario: 2200, estadoNomina: 'Pagada', iniciales: 'LC' },
        { id: 4, nombre: 'Elena Ruiz', email: 'eruiz@academia.com', cargo: 'Entrenadora Primera F', departamento: 'Cuerpo Técnico', salario: 2200, estadoNomina: 'Pagada', iniciales: 'ER' },
        { id: 5, nombre: 'Dr. Ramón Ponce', email: 'rponce@academia.com', cargo: 'Fisioterapeuta', departamento: 'Médico', salario: 2600, estadoNomina: 'Pendiente', iniciales: 'DR' },
        { id: 6, nombre: 'Marco Silva', email: 'msilva@academia.com', cargo: 'Ojeador Principal', departamento: 'Scouting', salario: 2400, estadoNomina: 'Pagada', iniciales: 'MS' },
        { id: 7, nombre: 'Pedro Alonso', email: 'palonso@academia.com', cargo: 'Encargado Residencia', departamento: 'Residencia', salario: 1800, estadoNomina: 'Pagada', iniciales: 'PA' },
        { id: 8, nombre: 'Rosa Jiménez', email: 'rjimenez@academia.com', cargo: 'Jefa de Limpieza', departamento: 'Residencia', salario: 1500, estadoNomina: 'Pagada', iniciales: 'RJ' },
        { id: 9, nombre: 'Antonio Vega', email: 'avega@academia.com', cargo: 'Jefe de Cocina', departamento: 'Residencia', salario: 1800, estadoNomina: 'Pagada', iniciales: 'AV' },
    ]);

    const [loading, setLoading] = useState(false);

    // Simulación de llamada a base de datos (Ej: Supabase)
    useEffect(() => {
        const fetchPersonalFromDB = async () => {
            setLoading(true);
            try {
                // AQUÍ HARÁS TU CONSULTA A LA BASE DE DATOS:
                // const { data, error } = await supabase.from('personal').select('*');
                // if (data) setPersonal(data);
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
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Personal</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 text-gray-400 text-sm">
                        Cargando personal desde la base de datos...
                    </div>
                ) : (
                    /* Tabla de Personal */
                    <div className="bg-[#111622] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                        <th className="py-4 px-6">Nombre</th>
                                        <th className="py-4 px-6">Cargo</th>
                                        <th className="py-4 px-6">Departamento</th>
                                        <th className="py-4 px-6">Salario</th>
                                        <th className="py-4 px-6">Nómina</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50 text-sm">
                                    {personal.map((empleado) => (
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
                                                {empleado.departamento}
                                            </td>

                                            {/* Salario */}
                                            <td className="py-4 px-6 font-bold text-white">
                                                €{empleado.salario.toLocaleString()}
                                            </td>

                                            {/* Nómina (Estado) */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getNominaBadge(empleado.estadoNomina)}`}>
                                                    {empleado.estadoNomina}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default PersonalCEO;