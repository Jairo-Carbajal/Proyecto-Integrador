import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./vistas/login";
import Ventas from "./vistas/Ventas";
import Asistencias from "./vistas/asistencias";
import Historialventas from "./vistas/historialventas";
import Inventario from "./vistas/inventario";
/*
Express, mysql2, cors: npm install express mysql2 cors
React-doom: npm install react-router-dom@6
*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/ventas" element={<Ventas></Ventas>} />
          <Route path="/asistencias" element={<Asistencias></Asistencias>} />
          <Route path="/inventario" element={<Inventario></Inventario>} />
          <Route path="/historialventas" element={<Historialventas></Historialventas>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
