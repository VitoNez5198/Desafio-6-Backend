require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Crear una instancia de Pool para establecer la conexión con la base de datos
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
});

// Obtener los datos de un usuario según su correo electrónico
const getUser = async (email) => {
    const result = await pool.query('SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
}

// Agregar un nuevo usuario a la base de datos
const addUser = async (email, password, rol, lenguage) => {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (user.rowCount > 0) {
        throw { code: 401, message: 'Email ya registrado' }
    }
    const passwordEncoded = bcrypt.hashSync(password); 
    const query = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [email, passwordEncoded, rol, lenguage];
    const result = await pool.query(query, values); 
    return result;
}

// Verificar las credenciales de un usuario
const verifyUser = async (email, password) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    const passwordEncoded = user.password;
    const isPasswordCorrect = bcrypt.compareSync(password, passwordEncoded); 
    if (!isPasswordCorrect) {
        throw { code: 401, message: 'Email o contraseña incorrecta' }
    } else {
        return result.rows;
    }
}

module.exports = {
    getUser,
    addUser,
    verifyUser
}
