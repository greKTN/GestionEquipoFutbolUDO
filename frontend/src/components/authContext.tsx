import React, {createContext, useState, useEffect, useContext} from "react";
import {supabase} from "../supabase";

type AuthContextType = {
    session: any;
    rol: string | null;
    cargando: boolean;
    actualizarRol: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({session: null, rol: null, cargando: false, actualizarRol: async () => {}});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    // [CAMBIO TEMPORAL]: Se inicializa con cargando en false y un rol de prueba para maquetación.
    // [ORIGINAL]: const [session, setSession] = useState<any>(null); const [rol, setRol] = useState<string | null>(null); const [cargando, setCargando] = useState<boolean>(true);
    const [session] = useState<any>(null);
    const [rol] = useState<string | null>("admin"); 
    const [cargando] = useState<boolean>(false);

    useEffect(() => {
        // [CAMBIO TEMPORAL]: Blindaje para evitar que explote si supabase.ts está desactivado.
        // [ORIGINAL]: Se ejecutaba directamente sin este if.
        if (!supabase || !supabase.auth) {
            return;
        }

        supabase.auth.getSession().then(({data: {session}}) =>{
            setSession(session);
            if (session) {
                buscarRol(session.user.id);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                buscarRol(session.user.id);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const buscarRol = async (_userId: string) => {
        // [CAMBIO TEMPORAL]: Función vacía para pruebas visuales.
        // [ORIGINAL]: Aquí iba todo el bloque 'try-catch' con el fetch al backend local.
    };

    return (
        <AuthContext.Provider value={{session, rol, cargando, actualizarRol: buscarRol}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);