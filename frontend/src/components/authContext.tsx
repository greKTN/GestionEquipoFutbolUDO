import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase";

type AuthContextType = {
    session: any;
    rol: string | null;
    cargando: boolean;
    actualizarRol: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null, 
    rol: null, 
    cargando: true, 
    actualizarRol: async () => {}
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [session, setSession] = useState<any>(null);
    const [rol, setRol] = useState<string | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        // Función asíncrona segura para inicializar la sesión
        const inicializarAuth = async () => {
            try {
                //Verificacion de si Supabase existe antes de llamarlo
                if (!supabase || !supabase.auth) {
                    console.error("Supabase no está configurado correctamente.");
                    setCargando(false);
                    return;
                }

                //Peticion de la sesion actual a Supabase
                const { data, error } = await supabase.auth.getSession();
                
                if (error) throw error;

                const currentSession = data?.session;
                setSession(currentSession);
                
                //Si hay sesión, se busca el rol. Si no, apagamos la carga.
                if (currentSession) {
                    await buscarRol(currentSession.user.id);
                } else {
                    setCargando(false);
                }
            } catch (err) {
                console.error("Error grave al obtener sesión:", err);
                //Se pone cargando en falso para que ya no ocurra el bug de que se queda eternamente cargando
                setCargando(false);
            }
        };

        inicializarAuth();

        //Listener de cambios
        if (supabase && supabase.auth) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, currentSession: any) => {
                setSession(currentSession);
                if (currentSession) {
                    await buscarRol(currentSession.user.id);
                } else {
                    setRol(null);
                    setCargando(false);
                }
            });

            return () => subscription.unsubscribe();
        }
    }, []);

    const buscarRol = async (userId: string) => {
        try{
            const respuesta = await fetch(`http://localhost:3000/api/usuarios/rol/${userId}`);
            if (respuesta.ok) {
                const data = await respuesta.json();
                setRol(data.rol);
            } else {
                setRol(null);
            }
        } catch (error) {
            console.error("Error al buscar el rol en PostgreSQL: ", error);
            setRol(null);
        } finally {
            setCargando(false);
        }
    };

    return (
        <AuthContext.Provider value={{session, rol, cargando, actualizarRol: buscarRol}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);