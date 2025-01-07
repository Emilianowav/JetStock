// components/buttons/MenuButton.tsx
import React from "react";
import styles from "./MenuButton.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  icon: React.ReactNode; // Acepta un icono
  type?: "button" | "submit" | "reset";
  className?: string;
  isActive?: boolean; // Nueva prop para indicar si el botón está activo
}

const MenuButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  type = "button",
  className = "",
  isActive = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${isActive ? styles.active : ""} ${className}`}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span> {/* Muestra el icono */}
      {text}
    </button>
  );
};

export default MenuButton;
