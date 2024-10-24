const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "030602",
  database: "Gandara",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint para login
app.post("/login", (req, res) => {
  const { email, contrasenia } = req.body;
  console.log("Intento de login:", req.body);

  const query = "SELECT ID FROM Empleado WHERE email = ? AND Contraseña = ?";
  const params = [email, contrasenia];

  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }

    if (results.length > 0) {
      const empleadoID = results[0].ID;
      res.json({ mensaje: "Inicio de sesión exitoso", empleadoID });
    } else {
      res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
  });
});


// Nueva ruta para obtener todas las ventas
app.get("/ventas-historial", (req, res) => {
  const query = `
    SELECT v.ID, c.Nombre AS NombreCliente, p.Nombre AS NombreProducto, v.Cantidad, 
           v.FechaVenta, v.FechaEntrega, v.PrecioTotal
    FROM Venta v
    JOIN Cliente c ON v.ClienteID = c.ID
    JOIN Producto p ON v.ProductoID = p.ID
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener las ventas:", error);
      return res.status(500).json({ error: "Error al obtener las ventas" });
    }
    res.json(results);
  });
});


// Ruta para obtener todos los productos (inventario)
app.get("/productos-inventario", (req, res) => {
  const query = "SELECT ID, Nombre, Stock, Precio FROM Producto";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ mensaje: "Error al obtener los productos" });
    } else {
      res.json(results);
    }
  });
});


// Ruta para registrar asistencia
app.post("/registrar-asistencia", (req, res) => {
  const { EmpleadoID, EstadoDeAsistencia, Fecha } = req.body;

  const query = `CALL RegistrarAsistencia(?, ?, ?)`;
  const params = [EmpleadoID, EstadoDeAsistencia, Fecha];

  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Error al registrar asistencia:", error);
      return res.status(500).json({ mensaje: "Error al registrar asistencia" });
    }
    res.json({ mensaje: "Asistencia registrada correctamente" });
  });
});


// Ruta para obtener asistencias de una fecha específica
app.get("/asistencias", (req, res) => {
  const { fecha } = req.query;
  const query = `
    SELECT E.ID, E.Nombre, E.Puesto, A.EstadoDeAsistencia
    FROM Empleado E
    LEFT JOIN Asistencia A ON E.ID = A.ID AND A.Fecha = ?
  `;
  
  db.query(query, [fecha], (error, results) => {
    if (error) {
      console.error("Error al obtener asistencias:", error);
      return res.status(500).json({ mensaje: "Error al obtener asistencias" });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
  const query = 'SELECT ID, Nombre FROM Cliente';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener clientes:', error);
      return res.status(500).json({ error: 'Error al obtener clientes' });
    }
    res.json(results);
  });
});

// Ruta para agregar un cliente
app.post('/agregar-cliente', (req, res) => {
  const { nombre, telefono } = req.body;

  const query = 'CALL AgregarCliente(?, ?)';
  db.query(query, [nombre, telefono], (error, results) => {
    if (error) {
      console.error('Error al agregar cliente:', error);
      return res.status(500).json({ error: 'Error al agregar cliente' });
    }
    const clienteID = results[0]?.insertId; // Obtén la ID del cliente recién agregado
    res.json({ success: true, clienteID });
  });
});

// Ejemplo de consulta a la base de datos para productos (Node.js)
app.get('/productos', (req, res) => {
  connection.query('SELECT ID, Nombre, Precio FROM Producto', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});


app.post("/registrar-venta", (req, res) => {
  const { cantidad, fechaVenta, fechaEntrega, ClienteID, EmpleadoID, ProductoID } = req.body;
  console.log("Datos recibidos en /registrar-venta:", { cantidad, fechaVenta, fechaEntrega, ClienteID, EmpleadoID, ProductoID });

  const query = `CALL RegistrarVenta(?, ?, ?, ?, ?, ?)`; // Procedimiento almacenado

  db.query(
    query,
    [cantidad, fechaVenta, fechaEntrega, ClienteID, EmpleadoID, ProductoID],
    (error, results) => {
      if (error) {
        console.error("Error al registrar la venta:", error);
        return res.status(500).json({ message: "Error al registrar la venta" });
      }
      res.status(200).json({ message: "Venta registrada correctamente" });
    }
  );
});


// Iniciar el servidor
app.listen(5000, () => {
  console.log(`Servidor corriendo en http://localhost:5000`);
});
