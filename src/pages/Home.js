import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // Inicialmente 60 segundos

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Convertir a milisegundos
      const timeRemaining = Math.floor((expirationTime - Date.now()) / 1000);

      if (timeRemaining <= 0) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      setTimeLeft(timeRemaining);

      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            alert("Sesión expirada");
            localStorage.removeItem("token");
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bienvenido al Home</h2>
      <p style={styles.countdown}>
        La sesión expirará en: <strong>{timeLeft} segundos</strong>
      </p>
      <button style={styles.button} onClick={() => { 
        localStorage.removeItem("token"); 
        navigate("/"); 
      }}>
        Cerrar sesión
      </button>
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
    fontSize: "2rem",
    marginBottom: "20px",
  },
  countdown: {
    fontSize: "3rem", // Tamaño grande del contador
    fontWeight: "bold",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#ff0000", // Botón rojo
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Home;
