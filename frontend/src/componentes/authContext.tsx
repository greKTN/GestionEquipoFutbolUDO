import React, {createContext, useState, useEffect, useContext} from "react";
import {supabase} from "../supabase";

//contexto para verificar que rol tiene el trabajador que inicio sesion
type AuthContextType = {
    session: any;
    rol: string | null;
    cargando: boolean;
    actualizarRol: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({session: null, rol: null, cargando: true, actualizarRol: async () => {}});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [session, setSession] = useState<any>(null);
    const [rol, setRol] = useState<string | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        //se obtiene la sesion actual

        supabase.auth.getSession().then(({data: {session}}) =>{
            setSession(session);
            if (session) {
                buscarRol(session.user.id);
            }
            else{
                setCargando(false);
            }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                buscarRol(session.user.id);
            }
            else{
                setRol(null);
                setCargando(false);
            }
        });
    }, []);

    const buscarRol = async (userId: string) => {
        try{
            const respuesta = await fetch(`http://localhost:3000/api/usuarios/rol/${userId}`);
            
            if (respuesta.ok) {
                const data = await respuesta.json();
                setRol(data.rol);
                setCargando(false);
            }
            else {
                setRol(null);
                setCargando(false);
            }
        }
        catch (error) {
            console.error("Error al buscar el rol: ", error);
            setRol(null);
            setCargando(false);
        }
        finally {
            setCargando(false);
        }
    };
    return (
        <AuthContext.Provider value={{session, rol, cargando, actualizarRol: buscarRol}}>
            {children}
        </AuthContext.Provider>
    );
};

//hook para poder usarlo desde cualquier parte
export const useAuth = () => useContext(AuthContext)