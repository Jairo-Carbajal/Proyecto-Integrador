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
          <Link to="/historialventas" class="boton-nav" style={{color:"black"}}>Historial de ventas</Link>
          <Link to="/asistencias" class="boton-nav" style={{color:"black"}}>Registro de asistencias</Link>
        </div>
        <div class="botones2">
          <Link to="/inventario" class="boton-nav1" style={{color:"black"}}>inventario</Link>
          <Link to="/ventas" class="boton-nav1" style={{color:"black"}}>Nueva venta</Link>
        </div>
      </div>
    

    </>
  );
}
export default Navbar;
