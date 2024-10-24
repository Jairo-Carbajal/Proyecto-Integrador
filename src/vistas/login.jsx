import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasenia }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        localStorage.setItem("empleadoID", data.empleadoID);
        navigate("/inventario"); 
      }
      else {
        const errorData = await response.json();
        setError(errorData.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="main-login">
      <h1 className="texto">GANDARA</h1>
      <div className="Espacio">
        <h1 className="login">Log In</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="sinput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="sinput"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
          <button className="botonlogin" style={{ color: "white" }} type="submit">
            Sign In
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
}

export default Login;
