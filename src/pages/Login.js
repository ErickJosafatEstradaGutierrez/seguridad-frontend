import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Ingresar</button>
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000", // Fondo negro
    color: "#fff", // Texto blanco
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "300px",
  },
  input: {
    padding: "12px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    border: "1px solid #fff",
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "12px",
    fontSize: "1.3rem",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Login;
