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
  password: "añaañaaña",
  database: "PI",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint para login
app.post("/login", (req, res) => {
  const { nombre, contrasenia } = req.body;
  console.log("Intento de login:", req.body);

  const query = "SELECT ID FROM Empleado WHERE Nombre = ? AND Contrasenia = ?";
  const params = [nombre, contrasenia];

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

// Iniciar el servidor
app.listen(5000, () => {
  console.log(`Servidor corriendo en http://localhost:5000`);
});
