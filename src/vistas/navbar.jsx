import { Link } from "react-router-dom";
import "../css/navbar.css"

function Navbar() {
  return (
    <>
      <div class="nav">
        <div class="botones">
          <div class="gand">
            <h1>GANDARA</h1>
          </div>
          <Link to="/historialventas">
            <button class="boton-nav">Historial de ventas</button>
          </Link>
          <Link to="/asistencias">
            <button class="boton-nav">Registro de asistencias</button>
          </Link>
        </div>
        <div class="botones2">
          <Link to="/inventario">
            <button class="boton-nav1">Inventario</button>
          </Link>
          <Link to="/ventas">
            <button class="boton-nav1">Nueva venta</button>
          </Link>

        </div>
      </div>
    

    </>
  );
}
export default Navbar;
