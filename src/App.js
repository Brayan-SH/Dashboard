import "./App.css";
import Login from './components/Login';
import NuevaCuenta from './components/NuevaCuenta';
import React, { useState } from 'react';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <React.StrictMode>
      {mostrarFormulario ? (
        <NuevaCuenta onVolver={() => setMostrarFormulario(false)} />
      ) : (
        <Login onCrearCuenta={() => setMostrarFormulario(true)} />
      )}
    </React.StrictMode>
  );
}

export default App;