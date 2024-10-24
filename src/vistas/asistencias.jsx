import { useState, useEffect } from "react";
import "../css/asistencias.css";
import Navbar from "./navbar";

function Asistencias() {
  const [empleados, setEmpleados] = useState([]);
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]); // Fecha de hoy

  useEffect(() => {
    // Obtener los empleados y sus asistencias de la fecha seleccionada
    fetch(`http://localhost:5000/asistencias?fecha=${fecha}`)
      .then((response) => response.json())
      .then((data) => {
        // Agregar "No registrado" a los empleados sin asistencia
        const empleadosConAsistencia = data.map(empleado => ({
          ...empleado,
          EstadoDeAsistencia: empleado.EstadoDeAsistencia || "NR" // NR para "No registrado"
        }));
        setEmpleados(empleadosConAsistencia);
      })
      .catch((error) => console.error("Error al obtener asistencias:", error));
  }, [fecha]);

  const handleDropdownChange = (idEmpleado, estado) => {
    fetch("http://localhost:5000/registrar-asistencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDEmpleado: idEmpleado,
        EstadoDeAsistencia: estado,
        Fecha: fecha,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Asistencia registrada correctamente");
          // Actualizar el estado local para reflejar el cambio
          setEmpleados(prevEmpleados =>
            prevEmpleados.map(empleado =>
              empleado.ID === idEmpleado
                ? { ...empleado, EstadoDeAsistencia: estado }
                : empleado
            )
          );
        } else {
          console.error("Error al registrar asistencia");
        }
      })
      .catch((error) => console.error("Error en la solicitud:", error));
  };

  return (
    <>
      <Navbar />
      <main className="maina">
        <section className="cont4">
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <div className="asistencia">
            <h2>Registro de Asistencia de Empleados</h2>
            <table id="attendanceTable">
              <thead className="theada">
                <tr className="tra">
                  <th className="tha">Nombre empl.</th>
                  <th className="tha">Puesto</th>
                  <th className="tha">Estado de Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.ID}>
                    <td className="tda">{empleado.Nombre}</td>
                    <td className="tda">{empleado.Puesto}</td>
                    <td className="tda">
                      <select
                        value={empleado.EstadoDeAsistencia}
                        onChange={(e) => handleDropdownChange(empleado.ID, e.target.value)}
                      >
                        <option value="No Registrado">No registrado</option>
                        <option value="Presente">Presente</option>
                        <option value="Ausente">Ausente</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Ausente Justificado">Ausente Justificado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default Asistencias;
