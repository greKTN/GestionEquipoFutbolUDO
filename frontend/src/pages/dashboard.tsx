import {useAuth} from "../componentes/authContext"
import RegistroPage from "./registro";

export default function Dashboard() {
    const {session, rol, cargando} = useAuth();

    //se comprueba que haya iniciado sesion, de lo contrario se le manda al login
    if(!session){
    return(
        <div className="App">
        <RegistroPage />
      </div>)
    }

    //se carga la info del usuario
    if(cargando){
        return <p>Cargando informacion del usuario....</p>;
    }
    
    
    //dashboard donde se evalua el rol para mostrar la info correspondiente al nivel de acceso
    return(
        <div>
            <h1>Resumen General</h1>
            <p>Tu rol es: <strong>{rol}</strong></p>

            {/*Info solo del CEO*/}
            {rol == 'CEO' && (
                <div>
                    <h2>Sos un capo</h2>
                    <p> lo ma- duro del sistema</p>
                </div>
            )}

            {/*Solo entrenadores */}
            {rol == 'entrenador' && (
                <div>
                    <h2>tiene que tlabajal, mucho tlabajal</h2>
                    <p>Ficha a FERRAN BALON DE ORO</p>
                </div>
            )}
            <button onClick={() => {
                // Al cerrar sesión, la página volverá automáticamente a RegistroPage
                    import('../supabase').then(module => module.supabase.auth.signOut())
                }}>
                    Cerrar Sesión
            </button>
        </div>
    );
}