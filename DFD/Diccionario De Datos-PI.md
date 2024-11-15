### **Nivel 0: DFD General**

* **Entidad: Cliente**  
  * *Descripción:* Persona que solicita productos y recibe facturas.  
  * *Datos asociados:* Nombre, identificación, solicitud de producto, facturas.  
* **Entidad: Empleado**  
  * *Descripción:* Persona que procesa las solicitudes de los clientes y registra las ventas.  
  * *Datos asociados:* ID de empleado, nombre, estado de las ventas, actualizaciones de inventario.  
* **Entidad: Gestor de Ventas**  
  * *Descripción:* Sistema o rol encargado de registrar las ventas.  
  * *Datos asociados:* Detalle de ventas, reportes de ventas registradas.

---

### **Nivel 1: Flujo Detallado de Registro y Asistencia de Empleados**

* **Entidad: Empleado**  
  * *Descripción:* Persona que ingresa su nombre para registrar su estado de asistencia.  
  * *Datos asociados:* Nombre, ID de empleado, estado de asistencia.  
* **Entidad: Administrador**  
  * *Descripción:* Persona encargada de registrar y supervisar la asistencia de empleados.  
  * *Datos asociados:* Lista de empleados actuales, reportes de asistencia.  
* **Proceso: Registro de Asistencia**  
  * *Descripción:* Registra el estado de asistencia de los empleados.  
  * *Entradas:* Nombre de empleado.  
  * *Salidas:* Estado de asistencia actualizado.

---

### **Nivel 2: Procesos de Venta e Inventario**

* **Entidad: Cliente**  
  * *Descripción:* Persona que realiza un pedido y recibe facturas.  
  * *Datos asociados:* Pedido, detalles del cliente, facturas generadas.  
* **Entidad: Empleado**  
  * *Descripción:* Encargado de procesar los pedidos, almacenar datos y gestionar el inventario.  
  * *Datos asociados:* ID empleado, datos ingresados, informes de inventario.  
* **Proceso: Registro de Venta**  
  * *Descripción:* Almacena la nueva cantidad en inventario y registra las ventas.  
  * *Entradas:* Pedido del cliente, datos del producto.  
  * *Salidas:* Actualización de inventario, nueva cantidad almacenada, registro de venta.  
* **Proceso: Reducción de Inventario**  
  * *Descripción:* Actualiza la cantidad en inventario después de cada venta.  
  * *Entradas:* Datos de ventas procesadas.  
  * *Salidas:* Nuevo estado del inventario.

