"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation"; 
import { AuthContext } from "../../app/context/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import styles from "./LogoutButton.module.css";

const LogoutButton: React.FC = () => {
  const authContext = useContext(AuthContext); // Obtener el contexto completo
  const router = useRouter(); // Usar el hook useRouter para la navegación

  if (!authContext) {
    console.error("AuthContext no está disponible. Asegúrate de envolver la app con AuthProvider.");
    return null; // No renderizar nada si el contexto es undefined
  }

  const { logout } = authContext; // Extraer logout después de la verificación

  const handleLogout = () => {
    logout(); 
    router.push("/login"); // Redirigir a la página de login
  };

  return (
    <div className={styles.greetingContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <TbLogout2 className={styles.logoutIcon} /> Cerrar sesión
      </button>
    </div>
  );
};

export default LogoutButton;
