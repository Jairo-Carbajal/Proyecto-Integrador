import { Link } from "react-router-dom";
import "../css/asistencias.css";
import Navbar from "./navbar";

function Asistencias() {
  return (
    <>
      <Navbar></Navbar>
      <h1>Asistencias</h1>
      <input type="date" id="fecha" name="fecha"></input>
      <div class="asistencia">
        <h2>Registro de Asistencia de Empleados</h2>
        <table id="attendanceTable">
          <thead class="theadv">
            <tr class="trv">
              <th class="thv">Nombre empl.</th>
              <th class="thv">Puesto</th>
              <th class="thv">P</th>
              <th class="thv">A</th>
              <th class="thv">T</th>
              <th class="thv">AJ</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default Asistencias;
