import {Registro, Login} from "../componentes/autenticacion";

export default function RegistroPage() {
    const handleRegistro = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const {data, error} = await Registro(email, password);
        if (error) {
            console.error("Error al registrar:", error.message);
        } else {
            console.log("Usuario registrado:", data);
        }
    };

    const handleLogin = async(event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
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