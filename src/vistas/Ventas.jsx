import { Link } from "react-router-dom";
import React from "react";
import "../css/Ventas.css";

function Ventas() {
  return (
    <>
      <div class="todo">
        <h1 class="text">GANDARA</h1>
        <h1 class="text2">GENERAR UNA NUEVA VENTA</h1>
      </div>

      <div class="formulario">
        <input type="text" class="venput" placeholder="Nombre del cliente" />
        <input type="text" class="venput" placeholder="Telefono" />
        <div class="juntos">
          <label htmlFor="producto">Producto</label>
          <select  id="producto">
            <option class="venput" value="queso">Queso</option>
            <option class="venput" value="leche">Leche</option>
            <option class="venput" value="yogurt">Yogurt</option>
          </select>
          <input type="text" class="venput" placeholder="Precio por unidad" />
        </div>
        <input type="text" class="venput" placeholder="Cantidad" />
        <input type="text" class="venput" placeholder="Precio Total" />
      </div>

      <div class="botonesventas">
        <Link to="/inventario">
          <button class="volver">VOLVER</button>
        </Link>
        <button class="confirmar">CONFIRMAR</button>
      </div>
    </>
  );
}
export default Ventas;
