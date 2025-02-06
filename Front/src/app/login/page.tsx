"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  
  const fixedUsername = "mor_2314";
  const fixedPassword = "83r5^_";
  
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Por favor ingrese usuario y contraseña.");
      return;
    }

  };
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          router.push("/dashboard");
        }
      }
    }, []);
  
  return (
    <div className={styles.container}>
      {/* Sección Izquierda - Video de Fondo con Texto */}
      <div className={styles.leftSection}>
        <video className={styles.videoBackground} autoPlay muted loop={false} playsInline>
          <source src="/loginVideo.mp4" type="video/mp4" />
          Tu navegador no soporta videos en HTML5.
        </video>
        <div className={styles.overlay}>
          <h2 className={styles.welcomeText}>Bienvenido a Stock Manager</h2>
          <p className={styles.description}>Simplifica la gestión de tu negocio: controla stock, maneja pedidos, registra clientes, proveedores y mucho más con Stock Manager</p>
          <div className={styles.buttonsContainer}>
            <Link href="/payment" className={styles.button}>
            Opciones de pago
            <svg className={styles.svgIcon} viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
          </Link>

          <Link href="/contact" className={styles.buttonContact}>
            <span>Contactanos</span>
            <svg
            className={styles.svgIconContact}
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 448 512"
            height="1em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
            ></path>
          </svg>
          </Link>

          </div>
        </div>
      </div>

      {/* Sección Derecha - Formulario de Login */}
      <div className={styles.rightSection}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>Bienvenido</h2>
          <p className={styles.loginSubtitle}>Inicia sesión en tu cuenta</p>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputsContainer}>
              <input
              className={styles.formInput}
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputsContainer}>
              <input
              className={styles.formInput}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.submitButton} type="submit">Entrar</button>
          </form>

          <div className={styles.signupText}>
            ¿No tienes una cuenta? <a href="#">Registrarse</a>
          </div>
        </div>
        <div className={styles.credentials}>
          <h4>Crendenciales para prueba de sistema (admin) </h4>
          <p>Usuario: {fixedUsername} </p>
          <p>Contraseña: {fixedPassword}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
