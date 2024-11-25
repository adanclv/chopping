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
app.get('/api/getCliente/:id', (req, res) => {
    const { id } = req.params;

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


// Proveedores
app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedor';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al buscar proveedores:', err);
            return res.status(500).json({ message: 'Error al buscar proveedores' });
        }
        res.status(200).json(result);
    });
});

app.post('/api/proveedores/create', (req, res) => {
    const { nombre, telefono, email, domicilio, rfc } = req.body;

    if (!nombre || !telefono || !email || !domicilio || !rfc) {
        console.log('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO Proveedor (NombProveedor, TelProveedor, MailProveedor, DomProveedor, RFCProveedor) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre, telefono, email, domicilio, rfc], (err, result) => {
        if (err) {
            console.error('Error al crear proveedor:', err);
            return res.status(500).json({ message: 'Error al crear proveedor' });
        }
        res.status(201).json({ message: 'Proveedor creado correctamente' });
    });
});

app.get('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM Proveedor WHERE NoProveedor = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al buscar proveedor:', err);
            return res.status(500).json({ message: 'Error al buscar proveedor' });
        }
        res.status(200).json(result[0]);
    });
});

app.put('/api/proveedores/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, domicilio, rfc, estado } = req.body;

    const query = 'UPDATE Proveedor SET NombProveedor = ?, TelProveedor = ?, MailProveedor = ?, DomProveedor = ?, RFCProveedor = ?, Estado = ? WHERE NoProveedor = ?';

    db.query(query, [nombre, telefono, email, domicilio, rfc, estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar proveedor:', err);
            return res.status(500).json({ message: 'Error al actualizar proveedor' });
        }
        res.status(200).json({ message: 'Proveedor actualizado correctamente' });
    });
});

app.delete('/api/proveedores/delete/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Proveedor WHERE NoProveedor = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar proveedor:', err);
            return res.status(500).json({ message: 'Error al eliminar proveedor' });
        }
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    });
});

// Categorias
app.get('/api/categoriasHome', (req, res) => {
    const query = 'SELECT NoCategoria, NombCategoria, ImgCategoria FROM Categoria';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al buscar categorias:', err);
            return res.status(500).json({ message: 'Error al buscar categorias' });
        }
        res.status(200).json(result);
    });
});

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

app.get('/api/categorias/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM Categoria WHERE NoCategoria = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al buscar categoria:', err);
            return res.status(500).json({ message: 'Error al buscar categoria' });
        }
        res.status(200).json(result[0]);
    });
});

app.post('/api/categorias/create', (req, res) => {
    const { nombre, descripcion, imagen, estado } = req.body;

    if (!nombre || !descripcion) {
        console.log('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO Categoria (NombCategoria, DescCategoria) VALUES (?, ?)';

    db.query(query, [nombre, descripcion], (err, result) => {
        if (err) {
            console.error('Error al crear categoria:', err);
            return res.status(500).json({ message: 'Error al crear categoria' });
        }
        res.status(201).json({ message: 'Categoria creada correctamente' });
    });
});

app.put('/api/categorias/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, estado } = req.body;

    const query = 'UPDATE Categoria SET NombCategoria = ?, DescCategoria = ?, ImgCategoria = ?, Estado = ? WHERE NoCategoria = ?';

    db.query(query, [nombre, descripcion, imagen, estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar categoria:', err);
            return res.status(500).json({ message: 'Error al actualizar categoria' });
        }
        res.status(200).json({ message: 'Categoria actualizada correctamente' });
    });
});

app.get('/api/categoriasSB', (req, res) => {
    const query = 'SELECT Categoria.NoCategoria, Categoria.NombCategoria, COUNT(Producto.CodigoProducto) as NumProductos FROM Categoria INNER JOIN Producto ON Categoria.NoCategoria = Producto.NoCategoria	GROUP BY Categoria.NoCategoria';


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

// Productos
app.get('/api/productos', (req, res) => {
    const query = 'SELECT CodigoProducto, NombProducto, PrecioVenta, ImgProducto FROM Producto';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ message: 'Error al buscar productos' });
        }
        res.status(200).json(result);
    })
});

app.get('/api/productos/:categoria', (req, res) => {
    const { categoria } = req.params;

    const query = 'SELECT CodigoProducto, NombProducto, PrecioVenta, ImgProducto FROM Producto WHERE NoCategoria = ?';

    db.query(query, [categoria], (err, result) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ message: 'Error al buscar productos' });
        }
        res.status(200).json(result);
    });
});

app.get('/api/producto/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM Producto WHERE CodigoProducto = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al buscar producto:', err);
            return res.status(500).json({ message: 'Error al buscar producto' });
        }
        res.status(200).json(result[0]);
    });
});

app.get('/api/productosBusqueda/:busqueda', (req, res) => {
    const { busqueda } = req.params;

    const query = 'SELECT CodigoProducto, NombProducto, PrecioVenta, ImgProducto FROM Producto WHERE NombProducto LIKE ? LIMIT 6';

    db.query(query, [`%${busqueda}%`], (err, result) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ message: 'Error al buscar productos' });
        }
        res.status(200).json(result);
    });
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})