import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Mantiene el estado abierto/cerrado guardado en la sesión del navegador
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebar_open');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('sidebar_open', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    const menuItems = [
        { name: 'Resumen General', icon: '📊', path: '/ceo' },
        { name: 'Categorías', icon: '⚽', path: '/ceo/categorias' },
        { name: 'Jugadores', icon: '👥', path: '/ceo/jugadores' },
        { name: 'Calendario', icon: '📅', path: '/ceo/calendario' },
        { name: 'Finanzas', icon: '💲', path: '/ceo/finanzas' },
        { name: 'Personal', icon: '👔', path: '/ceo/personal' },
    ];

    return (
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#070a10] border-r border-gray-800 flex flex-col justify-between py-6 px-4 select-none shrink-0 h-full relative z-10`}>
            <div>
                {/* Logo y Botón de colapsar */}
                <div className="flex items-center justify-between mb-8 px-2">
                    {isSidebarOpen && (
                        <div>
                            <h1 className="font-bold text-lg tracking-wider text-white">ÉLITE FC</h1>
                            <p className="text-xs text-gray-400">Academia de Fútbol</p>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-300 transition mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Rol Actual / Perfil */}
                <div className={`mb-6 p-3 rounded-xl bg-[#161b22] border border-gray-800 flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'}`}>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                        🛡️
                    </div>
                    {isSidebarOpen && (
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-amber-400 truncate">CEO / Director</p>
                            <p className="text-[10px] text-gray-400">Sesión activa</p>
                        </div>
                    )}
                </div>

                {/* Menú de Navegación Dinámico */}
                <nav className="space-y-1">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                title={!isSidebarOpen ? item.name : ''}
                                className={`w-full flex items-center ${isSidebarOpen ? 'space-x-3 px-3' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium transition ${
                                    isActive 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {isSidebarOpen && <span className="truncate">{item.name}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Cerrar Sesión */}
            <div>
                <button 
                    onClick={() => navigate('/')}
                    title={!isSidebarOpen ? 'Cerrar sesión' : ''}
                    className={`w-full flex items-center ${isSidebarOpen ? 'space-x-3 px-3' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition`}
                >
                    <span className="text-lg">🚪</span>
                    {isSidebarOpen && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;