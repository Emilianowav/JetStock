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

  // Verifica si el usuario ya está autenticado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        router.push("/");
      }
    }
  }, [router]);

  // Guarda la sesión en localStorage
  const saveUserSession = (user: string) => {
    localStorage.setItem("user", JSON.stringify({ username: user }));
  };

  // Muestra mensajes de error
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  // Maneja el inicio de sesión
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Por favor ingrese usuario y contraseña.");
      return;
    }

    if (username === fixedUsername && password === fixedPassword) {
      saveUserSession(username);
      router.push("/");
    } else {
      showError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Sección Izquierda - Video de Fondo con Texto */}
      <div className={styles.leftSection}>
        <video className={styles.videoBackground} autoPlay muted loop playsInline>
          <source src="/loginVideo.mp4" type="video/mp4" />
          Tu navegador no soporta videos en HTML5.
        </video>
        <div className={styles.overlay}>
          <h2 className={styles.welcomeText}>Bienvenido a Stock Manager</h2>
          <p className={styles.description}>
            Simplifica la gestión de tu negocio: controla stock, maneja pedidos, registra clientes, proveedores y mucho más con Stock Manager.
          </p>
          <div className={styles.buttonsContainer}>
            <Link href="/payment" className={styles.button}>Opciones de pago</Link>
            <Link href="/contact" className={styles.buttonContact}>Contactanos</Link>
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
          <h4>Credenciales para prueba de sistema (admin)</h4>
          <p>Usuario: {fixedUsername}</p>
          <p>Contraseña: {fixedPassword}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
