require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool( {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

pool.connect().then(() => console.log("Conectado exitosamente a PostgreSQL"))
.catch(error => console.error("Error conectando a la DB", error));

// ============================================================================
// --- RUTAS DE AUTENTICACIÓN Y REGISTRO ---
// ============================================================================

app.get('/api/usuarios/rol/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const queryTrabajador = 'SELECT rol FROM Trabajadores WHERE id_trabajador = $1';
        const resTrabajador = await pool.query(queryTrabajador, [userId]);
        if (resTrabajador.rows.length > 0) return res.json({ rol: resTrabajador.rows[0].rol });

        const queryUsuario = 'SELECT tipo_usuario FROM Usuario WHERE id_usuario = $1';
        const resUsuario = await pool.query(queryUsuario, [userId]);
        if (resUsuario.rows.length > 0) return res.json({ rol: resUsuario.rows[0].tipo_usuario });

        res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    const { id_usuario, nombre, email, tipo_usuario } = req.body;
    try {
        const checkTrabajador = await pool.query('SELECT * FROM Trabajadores WHERE email = $1', [email]);
        if (checkTrabajador.rows.length > 0) {
            const updateQuery = 'UPDATE Trabajadores SET id_trabajador = $1 WHERE email = $2 RETURNING *';
            const trabajadorActualizado = await pool.query(updateQuery, [id_usuario, email]);
            return res.status(200).json({ message: 'Trabajador vinculado exitosamente', user: trabajadorActualizado.rows[0] });
        }

        const insertQuery = 'INSERT INTO Usuario (id_usuario, nombre, email, tipo_usuario, saldo) VALUES ($1, $2, $3, $4, 0) RETURNING *;';
        const nuevoUsuario = await pool.query(insertQuery, [id_usuario, nombre, email, tipo_usuario]);
        res.status(201).json({ message: 'Usuario guardado localmente', user: nuevoUsuario.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.post('/api/jugadores', async (req, res) => {
    const { nombre, edad, email, telefono, id_representante, id_categoria, posicion, beca, genero } = req.body;
    try {
        const query = `
            INSERT INTO jugadores (nombre, edad, email, telefono, id_representante, id_categoria, posicion, beca, genero)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `;
        const values = [nombre, edad, email || null, telefono || null, id_representante ? parseInt(id_representante) : null, id_categoria ? parseInt(id_categoria) : null, posicion, beca, genero];
        const nuevoJugador = await pool.query(query, values);
        res.status(201).json({ message: 'Jugador registrado exitosamente', jugador: nuevoJugador.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el jugador.' });
    }
});

// ============================================================================
// --- RUTAS GET PARA EL FRONTEND (DASHBOARDS Y VISTAS) ---
// ============================================================================

app.get('/api/categorias', async (req, res) => {
    try {
        const query = `
            SELECT 
                c.id_categoria as id, 
                c.nombre, 
                c.rango_edad as edad, 
                c.genero, 
                COUNT(j.id_jugador) as jugadores,
                COALESCE((
                    -- Consulta optimizada directa a trabajadores
                    SELECT t.nombre 
                    FROM trabajadores t 
                    JOIN entrenadores_categoria ec ON t.id_trabajador = ec.id_trabajador 
                    WHERE ec.id_categoria = c.id_categoria 
                    LIMIT 1
                ), 'Sin asignar') as entrenador
            FROM categorias c
            LEFT JOIN jugadores j ON c.id_categoria = j.id_categoria
            GROUP BY c.id_categoria;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error interno' });
    }
});

app.get('/api/personal', async (req, res) => {
    try {
        const result = await pool.query('SELECT id_trabajador as id, nombre, email, rol as cargo, departamento, salario, estado_nomina as "estadoNomina" FROM trabajadores');
        const personalFormateado = result.rows.map(empleado => {
            const partes = empleado.nombre.split(' ');
            const iniciales = partes.length > 1 ? `${partes[0][0]}${partes[1][0]}`.toUpperCase() : `${partes[0][0]}${partes[0][1]}`.toUpperCase();
            return { ...empleado, iniciales };
        });
        res.json(personalFormateado);
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

app.get('/api/partidos', async (req, res) => {
    try {
        const query = `
            SELECT p.id_partido as id, p.fecha, p.rival, c.nombre || ' ' || substring(c.genero from 1 for 4) || '.' as categoria, p.condicion, p.estado, p.resultado
            FROM partidos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria ORDER BY p.fecha ASC;
        `;
        const result = await pool.query(query);
        const partidosFormateados = result.rows.map(partido => {
            const fechaObj = new Date(partido.fecha);
            const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
            return {
                id: partido.id, dia: fechaObj.getDate().toString(), mes: meses[fechaObj.getMonth()],
                hora: fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + 'h',
                rival: partido.rival, categoria: partido.categoria, condicion: partido.condicion, estado: partido.estado, resultado: partido.resultado
            };
        });
        res.json(partidosFormateados);
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

app.get('/api/jugadores/lista', async (req, res) => {
    try {
        const query = `
            SELECT j.id_jugador as id, j.nombre, j.posicion, c.nombre || ' ' || substring(c.genero from 1 for 4) || '.' as categoria,
            'Activo' as estado, 'Externo' as residencia,
            COALESCE((SELECT p.estado FROM pagos p WHERE p.id_jugador = j.id_jugador ORDER BY p.fecha DESC LIMIT 1), 'Sin registro') as cuota
            FROM jugadores j LEFT JOIN categorias c ON j.id_categoria = c.id_categoria ORDER BY j.nombre ASC;
        `;
        const result = await pool.query(query);
        const jugadoresFormateados = result.rows.map(jugador => {
            const partes = jugador.nombre.split(' ');
            return { ...jugador, iniciales: (partes.length > 1 ? `${partes[0][0]}${partes[1][0]}` : `${partes[0][0]}${partes[0][1]}`).toUpperCase() };
        });
        res.json(jugadoresFormateados);
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const [resJugadores, resPagos, resPartidos, resNominas] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM jugadores'),
            pool.query('SELECT monto, estado FROM pagos'),
            pool.query('SELECT COUNT(*) FROM partidos WHERE estado = $1', ['proximo']),
            pool.query('SELECT SUM(salario) as total_nomina FROM trabajadores')
        ]);

        const totalJugadores = parseInt(resJugadores.rows[0].count);
        const proxPartidos = parseInt(resPartidos.rows[0].count);
        const nominas = parseFloat(resNominas.rows[0].total_nomina) || 0;

        let ingresosMes = 0, cobrado = 0, porCobrar = 0, vencidoMonto = 0, cuotasVencidasCount = 0;

        resPagos.rows.forEach(pago => {
            const monto = parseFloat(pago.monto);
            ingresosMes += monto;
            if (pago.estado === 'Pagado') cobrado += monto;
            else if (pago.estado === 'Pendiente') porCobrar += monto;
            else if (pago.estado === 'Vencido') { porCobrar += monto; vencidoMonto += monto; cuotasVencidasCount++; }
        });

        const calcPorcentaje = (valor) => ingresosMes > 0 ? Math.round((valor / ingresosMes) * 100) : 0;

        res.json({
            statsPrincipales: { jugadores: totalJugadores, cuotasVencidas: cuotasVencidasCount, residentes: 7, proxPartidos: proxPartidos },
            finanzas: {
                ingresosMes, cobrado, porCobrar, nominas,
                pagosEstado: {
                    pagado: { monto: cobrado, porcentaje: calcPorcentaje(cobrado) },
                    pendiente: { monto: porCobrar - vencidoMonto, porcentaje: calcPorcentaje(porCobrar - vencidoMonto) },
                    vencido: { monto: vencidoMonto, porcentaje: calcPorcentaje(vencidoMonto) }
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});