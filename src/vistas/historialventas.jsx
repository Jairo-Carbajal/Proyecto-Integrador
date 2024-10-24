import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../css/historialventas.css";

function Historialventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Obtener las ventas desde la API
    fetch("http://localhost:5000/ventas-historial")
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error("Error al obtener las ventas:", error));
  }, []);

  return (
    <>
      <main className="mainhv">
        <Navbar />
        <section className="cont">
          <table className="tHV">
            <thead>
              <tr className="trhv">
                <th className="thhv">ID</th>
                <th className="thhv">Nombre cliente</th>
                <th className="thhv">Nombre producto</th>
                <th className="thhv">Cantidad</th>
                <th className="thhv">Fecha venta</th>
                <th className="thhv">Fecha entrega</th>
                <th className="thhv">Precio total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.ID} className="trhv">
                  <td className="tdhv">{venta.ID}</td>
                  <td className="tdhv">{venta.NombreCliente}</td>
                  <td className="tdhv">{venta.NombreProducto}</td>
                  <td className="tdhv">{venta.Cantidad}</td>
                  <td className="tdhv">{new Date(venta.FechaVenta).toLocaleDateString()}</td>
                  <td className="tdhv">
                    {venta.FechaEntrega ? new Date(venta.FechaEntrega).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="tdhv">
                  ${venta.PrecioTotal ? Number(venta.PrecioTotal).toFixed(2) : "0.00"}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Historialventas;
