import React from "react";


function Ventas() {
    useEffect(() => {
        fetch('http://localhost:5173/ventas')
          .then(response => response.json())
          .then(data => setReservas(data))
          .catch(error => console.error('Error al obtener las ventas:', error));
      }, []);
    return (
        <>
        
        </>
    );
}
export default Ventas;