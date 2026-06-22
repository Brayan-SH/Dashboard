import React, { useState, useEffect } from "react";

function NuevaCuenta({ onVolver }) {
const [roles, setRoles] = useState([]); // Estado para almacenar los roles cargados desde el backend
const [cargando, setCargando] = useState(true); // Estado para controlar la carga de roles

// Cargar roles desde el backend al montar el componente
useEffect(() => {
  const cargarRoles = async () => {
    console.log("🔄 Intentando cargar roles...");

    try {
      const response = await fetch("http://localhost:5000/api/roles");
      console.log("📡 Respuesta recibida:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Roles cargados");
        setRoles(data);
      } else {
        console.error("❌ Error al cargar roles. Status:", response.status);
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
    } finally {
      setCargando(false);
      console.log("✔️ Carga finalizada");
    }
  };
  cargarRoles();
}, []); // [] significa que solo se ejecuta al montar el componente

return (
  <section
    className="container p-5 text-center rounded-3"
    style={{ backgroundColor: "#424242", color: "white" }}
  >
    <h2>Nueva Cuenta</h2>
    <form id="registerForm" className="mt-4">
      <div className="row">
        <h5 className="text-start mb-3">👤 Datos Personales</h5>
        <h5 className="text-start mb-3"> </h5>
        <div className="mb-3">
          <label htmlFor="nombres" className="form-label text-start d-block">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            id="nombres"
            placeholder="Juan Luis"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="apellidos"
            className="form-label text-start d-block"
          >
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            placeholder="Pérez Gómez"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label text-start d-block">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            placeholder="JuanPerez123"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-start d-block">
            🔑 Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label text-start d-block">
            👤 Rol
          </label>
          <select
            className="form-control"
            id="role"
            required
            disabled={cargando}
          >
            <option value="">
              {cargando ? "Cargando roles..." : "Selecciona un rol"}
            </option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button 
        type="button" 
        className="btn btn-primary btn-lg me-3"
        >
          <i className="bi bi-person-plus"></i> Crear Cuenta
        </button>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={onVolver}
        >
          <i className="bi bi-x-circle"></i> Cancelar
        </button>
      </div>
    </form>
  </section>
);
}

export default NuevaCuenta;