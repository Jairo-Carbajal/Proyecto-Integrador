drop database if exists Gandara;
create database Gandara;
use Gandara;

CREATE TABLE Producto (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre enum('Leche','Yogurt','Queso'),
    Stock INT DEFAULT 0,
    Precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Cliente (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE Empleado (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    email varchar(50),
    Puesto VARCHAR(100),
    Sueldo DECIMAL(10, 2),
    Contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE Asistencia (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EmpleadoID INT,
    Fecha DATE NOT NULL,
    EstadoDeAsistencia ENUM('Presente', 'Ausente', 'Tarde', 'No Registrado','Ausente Justificado') NOT NULL,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(ID)
);

CREATE TABLE Venta (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FechaVenta DATE NOT NULL,
    EmpleadoID INT,
    ClienteID INT,
    ProductoID INT,
    Cantidad INT NOT NULL,
    PrecioTotal DECIMAL(10, 2),
    FechaEntrega DATE,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(ID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ID),
    FOREIGN KEY (ProductoID) REFERENCES Producto(ID)
);

-- Inserciones para la tabla Cliente
INSERT INTO Cliente (Nombre, telefono) VALUES
('María González', '555-1234'),
('Juan Pérez', '555-5678'),
('Ana Rodríguez', '555-9012');

-- Inserciones para la tabla Producto
INSERT INTO Producto (Nombre, Stock, Precio) VALUES
('Leche', 100, 2.50),
('yogurt', 75, 1.75),
('Queso', 50, 5.00);

-- Inserciones para la tabla Empleado
INSERT INTO Empleado (Nombre, email, Puesto, Sueldo, Contraseña) 
VALUES ('Carlos Martínez', 'carlos.martinez@example.com', 'Gerente', 3500.00, 'contraseñaSegura123');
INSERT INTO Empleado (Nombre, email, Puesto, Sueldo, Contraseña) 
VALUES ('Ana López', 'ana.lopez@example.com', 'Vendedor', 1200.50, 'contraseñaAna456');
INSERT INTO Empleado (Nombre, email, Puesto, Sueldo, Contraseña) 
VALUES ('Juan García', 'juan.garcia@example.com', 'Conductor', 1500.00, 'contraseñaJuan789');
INSERT INTO Empleado (Nombre, email, Puesto, Sueldo, Contraseña) 
VALUES ('María Fernández', 'maria.fernandez@example.com', 'Administrativo', 1800.25, 'contraseñaMaria101');


-- Inserciones para la tabla Asistencia
INSERT INTO Asistencia (EmpleadoID, Fecha, EstadoDeAsistencia) VALUES
(1, curdate(), 'Presente'),
(2, curdate(), 'Presente'),
(3, curdate(), 'Tarde');

-- Inserciones para la tabla Venta
INSERT INTO Venta (FechaVenta, EmpleadoID, ClienteID, ProductoID, Cantidad, PrecioTotal, FechaEntrega) VALUES
('2024-10-02', 1, 1, 1, 5, 12.50, '2024-10-03'),
('2024-10-02', 2, 2, 2, 3, 5.25, '2024-10-04'),
('2024-10-02', 1, 3, 3, 2, 10.00, '2024-10-03');


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
    IF LENGTH(NEW.Contraseña) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La contraseña debe tener al menos 8 caracteres.';
    END IF;
END //

CREATE TRIGGER ValidarContraseñaUpdate
BEFORE UPDATE ON Empleado
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.Contraseña) < 8 THEN
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
    WHERE EmpleadoID = NEW.EmpleadoID AND Fecha = NEW.Fecha;

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
    
    
    INSERT INTO Venta(Cantidad, FechaVenta, FechaEntrega, PrecioTotal, ClienteID, EmpleadoID, ProductoID)
    VALUES (p_Cantidad, p_FechaVenta, p_FechaEntrega, p_PrecioTotal, p_IDCliente, p_IDEmpleado, p_IDProducto);
    
    
    UPDATE Producto
    SET Stock = Stock - p_Cantidad
    WHERE ID = p_IDProducto;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AgregarCliente(
    IN p_nombre VARCHAR(255),
    IN p_telefono VARCHAR(20)
)
BEGIN
    INSERT INTO Cliente (Nombre, telefono)
    VALUES (p_nombre, p_telefono);
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
