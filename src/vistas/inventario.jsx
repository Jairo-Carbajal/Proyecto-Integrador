import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../css/inventario.css";

function Inventario() {
  return (
    <>
      <Navbar></Navbar>
      <main class="maini">
        <div class="inventario">
          <div class="texto3">
            <h1>INVENTARIO GANDARA</h1>
          </div>
        <section class="cont3">
            <table class="tabla-productos">
              <thead>
                <tr>
                  <th class="columna-producto">Producto</th>
                  <th class="columna-cantidad">Cantidad</th>
                  <th class="columna-stock">Stock</th>
                  <th class="columna-precio">Precio</th>
                  <th class="columna-comprar"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="celda-producto">Leche</td>
                  <td class="celda-cantidad">38</td>
                  <td class="celda-stock">200</td>
                  <td class="celda-precio">1500</td>
                  <td class="celda-comprar">
                    <button class="boton-comprar">Comprar</button>
                  </td>
                </tr>
                <tr>
                  <td class="celda-producto">Yogurt</td>
                  <td class="celda-cantidad">15</td>
                  <td class="celda-stock">333</td>
                  <td class="celda-precio">1800</td>
                  <td class="celda-comprar">
                    <button class="boton-comprar">Comprar</button>
                  </td>
                </tr>
                <tr>
                  <td class="celda-producto">Queso</td>
                  <td class="celda-cantidad">75</td>
                  <td class="celda-stock">1230</td>
                  <td class="celda-precio">1000</td>
                  <td class="celda-comprar">
                    <button class="boton-comprar">Comprar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </>
  );
}

export default Inventario;
