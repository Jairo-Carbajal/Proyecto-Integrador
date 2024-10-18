import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../css/historialventas.css";


function Historialventas() {
  return (
    <>
      <Navbar></Navbar>
      <main class="mainhv">
        <section class="cont">
          <table class="tHV">
            <thead >
              <tr class="trhv">
                <th class="thhv">ID</th>
                <th class="thhv">Nombre cliente</th>
                <th class="thhv">Nombre producto</th>
                <th class="thhv">Cantidad</th>
                <th class="thhv">Fecha venta</th>
                <th class="thhv">Fecha entrada</th>
                <th class="thhv">Precio total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="trhv">
                <td class="tdhv">001</td>
                <td class="tdhv">Juan Pérez</td>
                <td class="tdhv">Producto A</td>
                <td class="tdhv">5</td>
                <td class="tdhv">12/10/2024</td>
                <td class="tdhv">14/10/2024</td>
                <td class="tdhv">$500</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Historialventas;
