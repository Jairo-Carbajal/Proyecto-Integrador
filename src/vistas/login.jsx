import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {
  return (
    <>
      <main>
        <div class="texto">
        <h1>GANDARA</h1>
      </div>
      <section class="cont">
        <div class="Espacio">
        <h1 class="login">Log In</h1>
        <input type="text" class="sinput" placeholder="Nombre de usuario" />
        <input type="text" class="sinput" placeholder="Contraseña" />
        <Link to="/inventario">
          <button class="botonlogin" style={{ color: "white" }}>
            Sign In
          </button>
        </Link>
        
      </div>
      </section>
      </main>
      
      
    </>
  );
}
export default Login;
