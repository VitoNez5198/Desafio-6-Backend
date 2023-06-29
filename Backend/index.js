require('dotenv').config();
const { getUser, addUser, verifyUser } = require('./consultas');
const { vRegister, vLogin, vAuth } = require('./middleware');

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;

// Iniciar el servidor y mostrar un mensaje en la consola indicando el puerto
app.listen(PORT, console.log(`Servidor corriendo en puerto ${PORT}`));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Método: ${req.method}. Solicitud: ${req.url}`);
    next();
});

// Ruta GET '/usuarios' con el middleware 'vAuth'
app.get('/usuarios', vAuth, async (req, res) => {
    try {
        const { email } = req.data;
        const result = await getUser(email);
        res.json(result);
    } catch (error) {
        res.status(error.message || 500).send(error);
    }
});

// Ruta POST '/usuarios' con el middleware 'vRegister'
app.post('/usuarios', vRegister, async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        await addUser(email, password, rol, lenguage);
        res.status(201).send('Usuario creado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

// Ruta POST '/login' con el middleware 'vLogin'
app.post('/login', vLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        await verifyUser(email, password);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        console.log('Token creado exitosamente');
        res.send(token);
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

// Profe hice lo que pude, espero este todo correcto 
