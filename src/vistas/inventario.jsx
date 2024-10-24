import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../css/inventario.css";

function Inventario() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener los productos desde la API
    fetch("http://localhost:5000/productos-inventario")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener los productos:", error));
  }, []);

  return (
    <>
      <main className="principal">
        <Navbar />
        <section className="maini">
          <div className="inventario">
            <div className="texto3">
              <h1>INVENTARIO GANDARA</h1>
            </div>
            <div className="cont3">
              <table className="tabla-productos">
                <thead>
                  <tr>
                    <th className="columna-producto">Producto</th>
                    <th className="columna-stock">Stock</th>
                    <th className="columna-precio">Precio</th>
                    <th className="columna-comprar"></th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.ID}>
                      <td className="celda-producto">{producto.Nombre}</td>
                      <td className="celda-stock">{producto.Stock}</td>
                      <td className="celda-precio">
                        ${Number(producto.Precio).toFixed(2)}
                      </td>
                      <td className="celda-comprar">
                        <button className="boton-comprar">Comprar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Inventario;
