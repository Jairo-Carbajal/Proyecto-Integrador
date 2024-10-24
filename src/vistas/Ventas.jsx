import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/Ventas.css";

function Ventas() {
  const [clientes, setClientes] = useState([]);
  const [clienteID, setClienteID] = useState(""); // Almacena el ID del cliente seleccionado
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [producto, setProducto] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [fechaEntrega, setFechaEntrega] = useState("");

  // Obtener la lista de clientes desde la base de datos
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:5000/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  // Llamar fetchClientes al cargar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Calcular el precio total automáticamente
  const handleCantidadChange = (e) => {
    const cantidad = parseFloat(e.target.value);
    setCantidad(cantidad);
    setPrecioTotal(precioUnitario * cantidad);
  };

  const handleProductoChange = (e) => {
    const selectedProducto = e.target.value;
    setProducto(selectedProducto);

    // Supongamos que tienes un objeto que define los precios según el producto
    const precios = {
      3: 10.5,
      1: 2.5,
      2: 5.0,
    };

    const precio = precios[selectedProducto] || 0;
    setPrecioUnitario(precio);
    setPrecioTotal(precio * cantidad);
  };

  const handleRegistrarCliente = async () => {
    try {
      const response = await fetch("http://localhost:5000/agregar-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: cliente, telefono }),
      });
      const data = await response.json();

      if (data.success) {
        setClienteID(data.clienteID);
        console.log("Cliente registrado correctamente:", data.clienteID);
        // Actualizar la lista de clientes
        fetchClientes();
      } else {
        console.error("Error al registrar cliente");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro de cliente:", error);
    }
  };

  const handleConfirmarVenta = async () => {
    try {
      const empleadoID = localStorage.getItem("empleadoID"); // Recuperar el empleadoID del localStorage

      if (!empleadoID) {
        alert("Inicia sesión para confirmar la venta.");
        return;
      }

      if (!clienteID) {
        alert("Selecciona o registra un cliente antes de confirmar la venta.");
        return;
      }

      const ventaData = {
        ClienteID: clienteID,
        ProductoID: producto,
        cantidad,
        precioTotal,
        fechaVenta: new Date().toISOString().split("T")[0],
        fechaEntrega,
        EmpleadoID: empleadoID, // Usar el ID del empleado obtenido del localStorage
      };

      const response = await fetch("http://localhost:5000/registrar-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        console.log("Venta registrada correctamente");
      } else {
        console.error("Error al registrar la venta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <main className="mainv">
        <div className="todo">
          <h1 className="text">GANDARA</h1>
          <h1 className="text2">GENERAR UNA NUEVA VENTA</h1>
        </div>

        <div className="formulario">
          <h3>Seleccionar Cliente Existente</h3>
          <select
            className="venput"
            value={clienteID}
            onChange={(e) => setClienteID(e.target.value)} // Actualizar clienteID cuando se selecciona un cliente
          >
            <option value="">-- Selecciona un cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.ID} value={cliente.ID}>
                {cliente.Nombre}
              </option>
            ))}
          </select>

          <h3>O Registrar Nuevo Cliente</h3>
          <input
            type="text"
            className="venput"
            placeholder="Nombre del cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <input
            type="text"
            className="venput"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button onClick={handleRegistrarCliente} className="registrar">
            Registrar Cliente
          </button>

          <div className="juntos">
            <label htmlFor="producto">Producto</label>
            <select id="producto" value={producto} onChange={handleProductoChange}>
              <option className="venput" value="">
                Producto
              </option>
              <option className="venput" value="3">
                Queso
              </option>
              <option className="venput" value="1">
                Leche
              </option>
              <option className="venput" value="2">
                Yogurt
              </option>
            </select>
            <input
              type="text"
              className="venput"
              placeholder="Precio por unidad"
              value={precioUnitario}
              readOnly
            />
          </div>
          <input
            type="number"
            className="venput"
            placeholder="Cantidad"
            value={cantidad}
            onChange={handleCantidadChange}
          />
          <input
            type="text"
            className="venput"
            placeholder="Precio Total"
            value={precioTotal}
            readOnly
          />
          <input
            type="date"
            className="venput"
            placeholder="Fecha de Entrega"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
          />
        </div>

        <div className="botonesventas">
          <Link to="/inventario" className="volver" style={{ color: "black" }}>
            VOLVER
          </Link>
          <button className="confirmar" onClick={handleConfirmarVenta}>
            CONFIRMAR
          </button>
        </div>
      </main>
    </>
  );
}

export default Ventas;
