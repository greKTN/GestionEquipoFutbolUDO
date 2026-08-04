import React, { useState } from 'react';
import { Login as SupabaseLogin } from '../components/autenticacion';

const Login = () => {
    const [loading, setLoading] = useState(false);
    
    //Estados para los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await SupabaseLogin(email, password);
        
        if (error) {
            alert(error.message || 'Error al iniciar sesión');
            setLoading(false);
        } 
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row font-sans bg-[#010409]">
            {/* SECCIÓN IZQUIERDA: Banner */}
            <div className="hidden md:flex md:w-1/2 lg:w-1/2 relative bg-slate-900 min-h-screen">
                <img src="/images/Equipo.png" alt="Jugadores" className="absolute inset-0 w-full h-full object-contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
            </div>

            {/* SECCIÓN DERECHA: Formulario */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-16 lg:p-24 text-white min-h-screen">
                <div className="w-full max-w-lg space-y-12 my-auto">
                    
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Anzoategui SC</h1>
                        <p className="mt-3 text-slate-400 text-xl md:text-2xl">Sistema de Gestion Integral</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {/* Campo Correo */}
                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-gray-200">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-6 py-5 bg-[#161b22] border border-gray-600 rounded-xl text-white outline-none"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-gray-200">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-6 py-5 bg-[#161b22] border border-gray-600 rounded-xl text-white outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-4 space-y-4">
                            {/* Botón de Ingresar */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 px-8 rounded-2xl shadow-xl text-xl font-bold text-white bg-[#ff6b00] hover:bg-[#e66000]"
                            >
                                {loading ? 'INGRESANDO...' : 'INGRESAR'}
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;