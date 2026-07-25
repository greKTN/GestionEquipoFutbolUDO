import React from "react";
import {Registro, Login} from "../componentes/autenticacion";
import {useAuth} from "../componentes/authContext";

//pagina del registro
export default function RegistroPage() {
    const {actualizarRol} = useAuth();

    //funcion para manejar el registro de usuarios
    const handleRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: {value: string};
            password: {value: string};
            nombre: {value: string};
            tipo_usuario: {value: string};
        };
        const email = target.email.value;
        const password = target.password.value;
        const nombre = target.nombre.value;
        const tipo_usuario = target.tipo_usuario.value;

        //Registro en Supabase
        const {data, error} = await Registro(email, password);
        if (error) {
            console.error("Error al registrar:", error.message);
            return;
        } else {
            console.log("Usuario registrado:", data);
        }

        //Guardado en Postgre
        if (data.user) {
            const id_usuario = data.user.id;

            try {
                const response = await fetch('http://localhost:3000/api/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_usuario,
                        nombre,
                        email,
                        tipo_usuario
                    })
                });

                if (response.ok) {
                    console.log("¡Éxito! Usuario registrado en Supabase y en la DB local.");
                    await actualizarRol(id_usuario);
                } else {
                    console.error("Supabase lo creó, pero hubo un error en DB local.");
                }
            } catch (err) {
                console.error("Error conectando con el backend:", err);
            }
        }

    };

    //funcion para manejar el login
    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: {value: string};
            password: {value: string};
        };
        const email = target.email.value;
        const password = target.password.value;
        const {data, error} = await Login(email, password);
        if (error) {
            console.error("Error al iniciar sesión:", error.message);
        } else {
            console.log("Sesión iniciada:", data);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegistro}>
                <input type = "text" name = "nombre" placeholder = "Nombre Completo" required />

                <select name ="tipo_usuario" required>
                    <option value="">Seleccione su rol...</option>
                    <option value="jugador">Jugador</option>
                    <option value="representante">Representante</option>
                </select>

                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Registrar</button>
            </form>

            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}