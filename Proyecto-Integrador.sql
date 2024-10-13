create database PI;
use PI;

create table Producto(
ID int primary key,
NombreProducto varchar(50),
Stock int,
Precio decimal
);

create table Cliente(
ID int primary key,
Nombre varchar(50),
Telefono int
);

create table Empleado(
ID int primary key,
Nombre varchar(50),
Puesto varchar(50),
Sueldo decimal,
Contrasenia varchar(50)
);

Create table Asistencia(
EstadoDeAsistencia varchar(50),
Fecha date,
IDEmpleado int,
foreign key(IDEmpleado) references Empleado(ID)	
);

create table Venta(
ID int primary key,
Cantidad decimal,
FechaVenta date,
FechaEntrega date,
PrecioTotal decimal,
IDCliente INT,
IDEmpleado INT,
IDProducto INT,
foreign key(IDCliente) references Cliente(ID),
foreign key(IDEmpleado) references Empleado(ID),
foreign key(IDProducto) references Producto(ID)
);

DELIMITER //

CREATE PROCEDURE RegistrarVenta(
    IN p_Cantidad DECIMAL,
    IN p_FechaVenta DATE,
    IN p_FechaEntrega DATE,
    IN p_IDCliente INT,
    IN p_IDEmpleado INT,
    IN p_IDProducto INT
)
BEGIN
    DECLARE p_PrecioTotal DECIMAL;
    
    -- Calcular el precio total basado en la cantidad y el precio del producto
    SELECT (p_Cantidad * Precio) INTO p_PrecioTotal
    FROM Producto
    WHERE ID = p_IDProducto;
    
    -- Insertar la venta
    INSERT INTO Venta(Cantidad, FechaVenta, FechaEntrega, PrecioTotal, IDCliente, IDEmpleado, IDProducto)
    VALUES (p_Cantidad, p_FechaVenta, p_FechaEntrega, p_PrecioTotal, p_IDCliente, p_IDEmpleado, p_IDProducto);
    
    -- Actualizar el stock del producto
    UPDATE Producto
    SET Stock = Stock - p_Cantidad
    WHERE ID = p_IDProducto;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ActualizarStock(
    IN p_IDProducto INT,
    IN p_NuevoStock INT
)
BEGIN
    UPDATE Producto
    SET Stock = p_NuevoStock
    WHERE ID = p_IDProducto;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ConsultarVentasPorCliente(
    IN p_IDCliente INT
)
BEGIN
    SELECT V.ID, V.Cantidad, V.FechaVenta, V.FechaEntrega, V.PrecioTotal, P.NombreProducto
    FROM Venta V
    INNER JOIN Producto P ON V.IDProducto = P.ID
    WHERE V.IDCliente = p_IDCliente;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE RegistrarAsistencia(
    IN p_IDEmpleado INT,
    IN p_EstadoDeAsistencia VARCHAR(50),
    IN p_Fecha DATE
)
BEGIN
    INSERT INTO Asistencia(EstadoDeAsistencia, Fecha, IDEmpleado)
    VALUES (p_EstadoDeAsistencia, p_Fecha, p_IDEmpleado);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarSueldo(
    IN p_IDEmpleado INT,
    IN p_NuevoSueldo DECIMAL
)
BEGIN
    UPDATE Empleado
    SET Sueldo = p_NuevoSueldo
    WHERE ID = p_IDEmpleado;
END //

DELIMITER ;




