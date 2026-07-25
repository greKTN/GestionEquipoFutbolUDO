require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//conexion a postgre
const pool = new Pool( {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

//prueba de conexion
pool.connect().then(() => console.log("conectado exitosamente"))
.catch(error => console.error("Error conectadno a la DB", error));


// --- RUTAS DE LA API ---

/**
 * Ruta GET para obtener el rol del usuario.
 * Recibe el UUID generado por Supabase como parámetro en la URL.
 */
app.get('/api/usuarios/rol/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // 1. Buscamos primero en la tabla Trabajadores
        // Usamos $1 para evitar inyecciones SQL
        const queryTrabajador = 'SELECT rol FROM Trabajadores WHERE id_trabajador = $1';
        const resTrabajador = await pool.query(queryTrabajador, [userId]);

        if (resTrabajador.rows.length > 0) {
            // Si existe en Trabajadores, devolvemos su rol (ej. CEO, entrenador)
            return res.json({ rol: resTrabajador.rows[0].rol });
        }

        // 2. Si no es trabajador, buscamos en la tabla Usuario
        const queryUsuario = 'SELECT tipo_usuario FROM Usuario WHERE id_usuario = $1';
        const resUsuario = await pool.query(queryUsuario, [userId]);

        if (resUsuario.rows.length > 0) {
            // Si existe en Usuario, devolvemos su tipo (ej. jugador, representante)
            return res.json({ rol: resUsuario.rows[0].tipo_usuario });
        }

        // 3. Si no se encuentra en ninguna de las dos tablas
        res.status(404).json({ message: 'Usuario no encontrado en la base de datos local' });

    } catch (error) {
        console.error('Error al consultar el rol:', error);
        res.status(500).json({ message: 'Error interno del servidor al buscar el rol.' });
    }
});

/**
 * Ruta POST para registrar o vincular el usuario en la base de datos local
 * Se ejecuta justo después de que Supabase lo autentica
 */
app.post('/api/usuarios', async (req, res) => {
    const { id_usuario, nombre, email, tipo_usuario } = req.body;

    try {
        //Se verifica si el correo ya existe en la tabla de trabajadores
        const checkTrabajador = await pool.query('SELECT * FROM Trabajadores WHERE email = $1', [email]);

        if (checkTrabajador.rows.length > 0) {
            //Si ya estaba registrado, se actualiza el UUID del Postgre para que sea igual al de SUpa
            const updateQuery = 'UPDATE Trabajadores SET id_trabajador = $1 WHERE email = $2 RETURNING *';
            const trabajadorActualizado = await pool.query(updateQuery, [id_usuario, email]);
            
            return res.status(200).json({ 
                message: 'Trabajador vinculado exitosamente', 
                user: trabajadorActualizado.rows[0] 
            });
        }

        //Si no es un trabajador pre-registrado, se asume que es un usuario normal (Jugador/Representante)
        const insertQuery = `
            INSERT INTO Usuario (id_usuario, nombre, email, tipo_usuario, saldo) 
            VALUES ($1, $2, $3, $4, 0) RETURNING *;
        `;
        const nuevoUsuario = await pool.query(insertQuery, [id_usuario, nombre, email, tipo_usuario]);

        res.status(201).json({ 
            message: 'Usuario guardado en PostgreSQL local', 
            user: nuevoUsuario.rows[0] 
        });

    } catch (error) {
        console.error('Error al guardar o vincular en base de datos local:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

/**
 * Ruta POST para registrar un nuevo jugador
 */
app.post('/api/jugadores', async (req, res) => {
    //se obtiene toda la info
    const { 
        nombre, 
        edad, 
        email, 
        telefono, 
        id_representante, 
        id_categoria, 
        posicion, 
        beca, 
        genero 
    } = req.body;

    try {
        //Se arma la query para postgre
        //se usa $1, $2, etc., para evitar inyecciones SQL.
        const query = `
            INSERT INTO jugadores 
            (nombre, edad, email, telefono, id_representante, id_categoria, posicion, beca, genero)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *;
        `;

        const values = [
            nombre,
            edad,
            email || null,
            telefono || null,
            id_representante ? parseInt(id_representante) : null,
            id_categoria ? parseInt(id_categoria) : null,
            posicion,
            beca,
            genero
        ];

        //se ejecuta y guardan los valores
        const nuevoJugador = await pool.query(query, values);


        res.status(201).json({ 
            message: 'Jugador registrado exitosamente', 
            jugador: nuevoJugador.rows[0] 
        });

    } catch (error) {
        console.error('Error al guardar jugador en BD:', error);
        res.status(500).json({ message: 'Error interno del servidor al registrar el jugador.' });
    }
});

//Abre el puerto especificado en las variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});