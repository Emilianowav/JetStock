"use client";
import React, { useState } from "react";
import Modal from "../modals/LoginModal"; // Importamos el modal
import styles from "./LoginButton.module.css";

interface LoginButtonProps {
  onLoginSuccess: () => void; // Callback que se llama cuando el login es exitoso
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLoginSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_error, setError] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(""), 7000); 
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Por favor ingrese usuario y contraseña.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(); // Llamamos al callback para indicar que el login fue exitoso
        toggleModal(); // Cierra el modal
      } else {
        showError(data.message || "Error en el login.");
      }
    } catch (error) {
      showError("Ocurrió un error en el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <>
      <button className={styles.loginButton} onClick={toggleModal}>
        Ingresar
      </button>
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Iniciar sesión</h2>
            {_error && <p className={styles.error}>{_error}</p>} 
            <form onSubmit={handleLogin} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className={styles.button} type="submit">
                Entrar
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginButton;
