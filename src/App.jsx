import { useState } from 'react'
import {Routes,Route,BrowserRouter,} from "react-router-dom";
import Login from './vistas/login';
import Ventas from './vistas/Ventas';
import Asistencias from './vistas/asistencias';
import Navbar from './vistas/Navbar';
/*
Express, mysql2, cors: npm install express mysql2 cors

React-doom: npm install react-router-dom@6
*/
function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login></Login>}/>
        <Route path="/ventas" element={<Ventas></Ventas>}/>
        <Route path="/asistencias" element={<Asistencias></Asistencias>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
