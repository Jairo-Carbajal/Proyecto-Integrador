drop database if exists PI;
create database PI;
use PI;

create table Producto(
ID INT AUTO_INCREMENT PRIMARY KEY,
NombreProducto varchar(50),
Stock int,
Precio decimal
);

create table Cliente(
ID INT AUTO_INCREMENT PRIMARY KEY,
Nombre varchar(50),
Telefono int
);

create table Empleado(
ID INT AUTO_INCREMENT PRIMARY KEY,
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
ID INT AUTO_INCREMENT PRIMARY KEY,
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

INSERT INTO Cliente (ID, Nombre, Telefono) VALUES
(1, 'Ana Torres', 123456789),
(2, 'Luis Martínez', 987654321),
(3, 'Pedro Sánchez', 456789123);


INSERT INTO Producto (ID, NombreProducto, Stock, Precio) VALUES
(1, 'Laptop', 10, 800.00),
(2, 'Mouse', 50, 20.00),
(3, 'Teclado', 30, 35.00);

INSERT INTO Empleado (ID, Nombre, Puesto, Sueldo, Contrasenia)
VALUES
(1, 'Juan Pérez', 'Desarrollador', 50000.00, 'contraseña123'),
(2, 'María López', 'Diseñadora', 45000.00, 'contraseña456'),
(3, 'Carlos García', 'Gerente', 60000.00, 'contraseña789');

INSERT INTO Asistencia (EstadoDeAsistencia, Fecha, IDEmpleado) VALUES
('Presente', '2024-10-01', 1),
('Ausente', '2024-10-01', 2),
('Presente', '2024-10-01', 3);

INSERT INTO Venta (ID, Cantidad, FechaVenta, FechaEntrega, PrecioTotal, IDCliente, IDEmpleado, IDProducto) VALUES
(1, 2, '2024-10-05', '2024-10-10', 1600.00, 1, 1, 1),
(2, 1, '2024-10-06', '2024-10-12', 20.00, 2, 2, 2),
(3, 3, '2024-10-07', '2024-10-14', 105.00, 3, 3, 3);

DELIMITER //
CREATE TRIGGER RestaurarStock
AFTER DELETE ON Venta
FOR EACH ROW
BEGIN
    UPDATE Producto
    SET Stock = Stock + OLD.Cantidad
    WHERE ID = OLD.IDProducto;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER ValidarTelefono
BEFORE INSERT ON Cliente
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.Telefono) < 8 OR LENGTH(NEW.Telefono) > 15 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El número de teléfono debe tener entre 8 y 15 dígitos.';
    END IF;
END //

CREATE TRIGGER ValidarTelefonoUpdate
BEFORE UPDATE ON Cliente
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.Telefono) < 8 OR LENGTH(NEW.Telefono) > 15 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El número de teléfono debe tener entre 8 y 15 dígitos.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER ValidarContrasenia
BEFORE INSERT ON Empleado
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.Contrasenia) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La contraseña debe tener al menos 8 caracteres.';
    END IF;
END //

CREATE TRIGGER ValidarContraseniaUpdate
BEFORE UPDATE ON Empleado
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.Contrasenia) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La contraseña debe tener al menos 8 caracteres.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER EvitarAsistenciaDuplicada
BEFORE INSERT ON Asistencia
FOR EACH ROW
BEGIN
    DECLARE contador INT;

    SELECT COUNT(*) INTO contador
    FROM Asistencia
    WHERE IDEmpleado = NEW.IDEmpleado AND Fecha = NEW.Fecha;

    IF contador > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El empleado ya tiene un registro de asistencia para esta fecha.';
    END IF;
END //
DELIMITER ;

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
    
    
    SELECT (p_Cantidad * Precio) INTO p_PrecioTotal
    FROM Producto
    WHERE ID = p_IDProducto;
    
    
    INSERT INTO Venta(Cantidad, FechaVenta, FechaEntrega, PrecioTotal, IDCliente, IDEmpleado, IDProducto)
    VALUES (p_Cantidad, p_FechaVenta, p_FechaEntrega, p_PrecioTotal, p_IDCliente, p_IDEmpleado, p_IDProducto);
    
    
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