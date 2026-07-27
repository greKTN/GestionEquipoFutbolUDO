import { useState } from 'react';

export interface DatosRegistro {
    nombre: string;
    edad: number | string;
    email: string;
    telefono: string;
    id_representante: string | number; 
    id_categoria: string | number; 
    posicion: string;
    beca: string;
    genero: string
}

// Estado en blanco mapeado a la DB
const estadoInicial: DatosRegistro = {
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    id_representante: '',
    id_categoria: '',
    posicion: '',
    beca: 'no becado',
    genero: ''
};

export default function ModalRegistro({ abierto, cerrarModal }: { abierto: boolean, cerrarModal: () => void }) {
    const [datos, setDatos] = useState<DatosRegistro>(estadoInicial);

    const manejoCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDatos(prevDatos => {
            const nuevosDatos = { ...prevDatos };

            // Formateo de teléfono
            if (name == 'telefono') {
                const numerico = value.replace(/\D/g, '');
                const truncado = numerico.slice(0, 11);
                if (truncado.length > 4) {
                    nuevosDatos.telefono = `${truncado.slice(0, 4)}-${truncado.slice(4)}`;
                } else {
                    nuevosDatos.telefono = truncado;
                }
            } 
            // Manejo de edad y asignación automática de ID de categoría
            else if (name === 'edad') {
                const edadNum = value === '' ? '' : Number(value);
                nuevosDatos.edad = edadNum;
                
                //Id de categorias
                if (typeof edadNum === 'number') {
                    if (edadNum <= 7) nuevosDatos.id_categoria = 1; // Ej: ID de sub-7
                    else if (edadNum <= 9) nuevosDatos.id_categoria = 2; // Ej: ID de sub-9
                    else if (edadNum <= 11) nuevosDatos.id_categoria = 3; // Ej: ID de sub-11
                    else if (edadNum <= 15) nuevosDatos.id_categoria = 4; // Ej: ID de sub-15
                    else if (edadNum <= 16) nuevosDatos.id_categoria = 5; // Ej: ID de sub-16
                    else if (edadNum <= 18) nuevosDatos.id_categoria = 6; // Ej: ID de sub-18
                    else nuevosDatos.id_categoria = 7; // Ej: ID de Primer Equipo
                } 
                else {
                    nuevosDatos.id_categoria = '';
                }
            } 
            else {
                nuevosDatos[name as keyof DatosRegistro] = value;
            }

            return nuevosDatos;
        });
    };

    const manejarCierre = () => {
        setDatos(estadoInicial);
        cerrarModal();
    };

    const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //peticion POST
            const response = await fetch('http://localhost:3000/api/jugadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //conversion a JSON
                body: JSON.stringify(datos)
            });

            if(response.ok) {
                const data = await response.json();
                console.log("Jugador registrado", data);
                alert("Jugador registrado con exito");
                manejarCierre();
            }
            else{
                const errorData = await response.json();
                console.log(`Error al registrar: ${errorData.message}`);
            }
        }
        catch(error){
            console.error("Error de conexion", error);
            alert("No se pudo conectar con el servidor")
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${abierto ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                
                <button onClick={manejarCierre} type="button" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-zinc-900">Registro de Jugador</h2>
                
                <form onSubmit={enviarDatos} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Columna Izquierda */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Nombre Completo:</label>
                            <input type="text" name="nombre" value={datos.nombre} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" required />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Edad:</label>
                            <input type="number" name="edad" value={datos.edad} onChange={manejoCambio} min="3" max="50" className="w-full p-2 border rounded text-zinc-900 bg-white" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Género:</label>
                            <select name="genero" value={datos.genero} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" required>
                                <option value="">Seleccione...</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Posición:</label>
                            <input type="text" name="posicion" value={datos.posicion} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" placeholder="Ej: Mediocampista" required />
                        </div>
                    </div>

                    {/* Columna Derecha */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Email:</label>
                            <input type="email" name="email" value={datos.email} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Teléfono: </label>
                            <input type="text" name="telefono" value={datos.telefono} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" placeholder="0414-1234567" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Representante (FK):</label>
                            <select name="id_representante" value={datos.id_representante} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" required>
                                <option value="">Seleccione representante...</option>
                                {/* Aquí se debe hacer un map() con los representantes obtenidos de la API */}
                                <option value="1">Juan Pérez (ID: 1)</option>
                                <option value="2">María Gómez (ID: 2)</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold">Estado de Beca:</label>
                            <select name="beca" value={datos.beca} onChange={manejoCambio} className="w-full p-2 border rounded text-zinc-900 bg-white" required>
                                <option value="no becado">No Becado</option>
                                <option value="media">Media Beca</option>
                                <option value="completa">Beca Completa</option>
                            </select>
                        </div>
                        
                        {/* Campo oculto o solo lectura para ver la categoría asignada */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-sm font-bold text-gray-500">Categoría Asignada (ID):</label>
                            <input type="text" value={datos.id_categoria} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-600" />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t pt-4">
                        <button type="button" onClick={manejarCierre} className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition-all duration-200">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                            Registrar Jugador
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}