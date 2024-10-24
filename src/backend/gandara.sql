drop database if exists Gandara;
create database Gandara;
use Gandara;

CREATE TABLE Producto (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre enum('Leche','yogurt','Queso'),
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
    Puesto VARCHAR(100),
    Sueldo DECIMAL(10, 2),
    Contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE Asistencia (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EmpleadoID INT,
    Fecha DATE NOT NULL,
    EstadoDeAsistencia ENUM('Presente', 'Ausente', 'Tarde') NOT NULL,
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
INSERT INTO Empleado (Nombre, Puesto, Sueldo, Contraseña) VALUES
('Carlos Sánchez', 'Vendedor', 1500.00, 'pass123'),
('Laura Martínez', 'Gerente', 2500.00, 'securepass456'),
('Roberto López', 'Repartidor', 1200.00, 'delivery789');

-- Inserciones para la tabla Asistencia
INSERT INTO Asistencia (EmpleadoID, Fecha, EstadoDeAsistencia) VALUES
(1, '2024-10-02', 'Presente'),
(2, '2024-10-02', 'Presente'),
(3, '2024-10-02', 'Tarde');

-- Inserciones para la tabla Venta
INSERT INTO Venta (FechaVenta, EmpleadoID, ClienteID, ProductoID, Cantidad, PrecioTotal, FechaEntrega) VALUES
('2024-10-02', 1, 1, 1, 5, 12.50, '2024-10-03'),
('2024-10-02', 2, 2, 2, 3, 5.25, '2024-10-04'),
('2024-10-02', 1, 3, 3, 2, 10.00, '2024-10-03');


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