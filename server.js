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

// Registro cliente
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
                return res.status(500).json({ message: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.' });
            }
            return res.status(201).json({ message: 'Tu cuenta ha sido creada exitosamente.' });
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.' });
    }
});

// Inicio de sesión cliente
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT NoCliente, UsrCliente, NombCliente ,PassCliente FROM Cliente WHERE UsrCliente = ?';

    db.query(query, [username], (err, result) => {
        if (err) {
            console.log('Error al buscar usuario: ', err);
            return res.status(500).json({ message: 'Error al buscar usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Username o constraseña incorrecta' });
        }

        const user = result[0];

        if (!bcrypt.compareSync(password, user.PassCliente)) {
            return res.status(401).json({ message: 'Username o constraseña incorrecta' });
        }

        const token = jwt.sign({ username: user.UsrCliente }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Inicio de sesión exitoso', token, id: user.NoCliente , username: user.UsrCliente, nombre:user.NombCliente });
    });
});

// Obtener cliente
app.get('/api/getCliente', (req, res) => {
    const { id } = req.query;

    const query = 'SELECT * FROM Cliente WHERE NoCliente = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.log('Error al buscar cliente: ', err);
            return res.status(500).json({ message: 'Error al buscar cliente' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const cliente = result[0];

        return res.status(200).json({ message: 'Cliente encontrado', cliente });
    });
});

// Actualizar cliente
app.put('/api/updateCliente', (req, res) => {
    const { id, nombre, paterno, materno, correo, telefono, domicilio } = req.body;

    const query = `
        UPDATE Cliente SET
        NombCliente = COALESCE(?, NombCliente),
        ApePatCliente = COALESCE(?, ApePatCliente),
        ApeMatCliente = COALESCE(?, ApeMatCliente),
        MailCliente = COALESCE(?, MailCliente),
        TelCliente = COALESCE(?, TelCliente),
        DomCliente = COALESCE(?, DomCliente)
        WHERE NoCliente = ?`;

    db.query(query, [nombre, paterno, materno, correo, telefono, domicilio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ message: 'Error al actualizar cliente' });
        }
        res.status(200).json({ message: 'Cliente actualizado correctamente' });
    });
});

// Cambiar contraseña
app.put('/api/changePassword', (req, res) => {
    const { id, password, newPassword } = req.body;

    const query = 'SELECT PassCliente FROM Cliente WHERE NoCliente = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al buscar contraseña:', err);
            return res.status(500).json({ message: 'Error al buscar contraseña' });
        }

        const user = result[0];

        if (!bcrypt.compareSync(password, user.PassCliente)) {
            return res.status(401).json({ message: 'La contraseña actual no es correcta. Por favor, inténtalo nuevamente.' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const updateQuery = 'UPDATE Cliente SET PassCliente = ? WHERE NoCliente = ?';

        db.query(updateQuery, [hashedPassword, id], (error, result) => {
            if (error) {
                console.error('Error al cambiar contraseña:', error);
                return res.status(500).json({ message: 'Error al cambiar contraseña' });
            }
            res.status(200).json({ message: 'Contraseña cambiada correctamente' });
        });
    });
});

// Eliminar cliente


// Categorias
app.get('/api/categorias', (req, res) => {
    const query = 'SELECT * FROM Categoria';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al buscar categorias:', err);
            return res.status(500).json({ message: 'Error al buscar categorias' });
        }
        res.status(200).json(result);
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