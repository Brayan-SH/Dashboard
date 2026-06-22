import React, { useState } from "react";
import "./Login.css";

function Login({ onCrearCuenta }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación con el backend
    console.log("Login:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign in</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Usuario@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label">Email</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label">Password</label>
          </div>

          <div className="remember-password">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember password</label>
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <div className="social-login">
          <button
            type="button"
            className="btn-social btn-google"
            onClick={() => console.log("Login con Google")}
          >
            <i className="bi bi-google"></i> Iniciar sesión con Google
          </button>

          <button
            type="button"
            className="btn-social btn-facebook"
            onClick={() => console.log("Login con Facebook")}
          >
            <i className="bi bi-facebook"></i> Iniciar sesión con Facebook
          </button>
        </div>

        <hr className="divider" />

        <button
          type="button"
          className="btn-crear-cuenta"
          onClick={onCrearCuenta}
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}

export default Login;
