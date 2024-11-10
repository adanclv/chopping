const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'secretkey';

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chopi_club'
});

db.connect(error => {
    if (error) {
        console.log('Error al conectar a la base de datos: ', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Registro
app.post('/api/register', (req, res) => {
    const { nombre_usuario, nombre, paterno, materno, email, contrasena, domicilio, telefono } = req.body;

    if (!nombre_usuario || !nombre || !paterno || !materno || !email || !contrasena || !domicilio || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const id = Math.random().toString(36).substr(2, 10);
        const hashedPassword = bcrypt.hashSync(contrasena, 10);

        const query = 'INSERT INTO Cliente (NoCliente, UsrCliente, NombCliente, ApePatCliente, ApeMatCliente, TelCliente, MailCliente, DomCliente, PassCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(query, [id, nombre_usuario, nombre, paterno, materno, telefono, email, domicilio, hashedPassword], (error, result) => {
            if (error) {
                console.log('Error al registrar usuario: ', error);
                return res.status(500).json({ message: 'Error al registrar usuario' });
            }
            console.log('Usuario registrado con éxito');
            return res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT NoCliente, UsrCliente, PassCliente FROM Cliente WHERE UsrCliente = ?';

    db.query(query, [username], (err, result) => {
        if (err) {
            console.log('Error al buscar usuario: ', err);
            return res.status(500).json({ message: 'Error al buscar usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result[0];

        if (!bcrypt.compareSync(password, user.PassCliente)) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ username: user.UsrCliente }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Inicio de sesión exitoso', token, id: user.NoCliente , username: user.UsrCliente });
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        req.user = decoded;
        next();
    });    
};

app.get('/', (req, res) => {
    res.send('Server is ready');
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})