import { Link } from "react-router-dom";
import "../css/asistencias.css";
import Navbar from "./navbar";

function Asistencias() {
  return (
    <>
      <Navbar></Navbar>
      <main class="maina">
        <section class="cont4">
          <input type="date" id="fecha" name="fecha"></input>
          <div class="asistencia">
            <h2>Registro de Asistencia de Empleados</h2>
            <table id="attendanceTable">
              <thead class="theada">
                <tr class="tra">
                  <th class="tha">Nombre empl.</th>
                  <th class="tha">Puesto</th>
                  <th class="tha">P</th>
                  <th class="tha">A</th>
                  <th class="tha">T</th>
                  <th class="tha">AJ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tda">Chambi</td>
                  <td class="tda">Verdulero</td>
                  <td class="tda">
                    <input type="checkbox"></input>
                  </td>
                  <td class="tda">
                    <input type="checkbox"></input>
                  </td>
                  <td class="tda">
                    <input type="checkbox"></input>
                  </td>
                  <td class="tda">
                    <input type="checkbox"></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default Asistencias;
