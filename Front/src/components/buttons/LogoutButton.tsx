// components/buttons/LogoutButton.tsx
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import styles from "./LogoutButton.module.css";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <div className={styles.greetingContainer}>
      <button className={styles.logoutButton} onClick={onLogout}>
        <TbLogout2 className={styles.logoutIcon} /> Cerrar sesión
      </button>
    </div>
  );
};

export default LogoutButton;
