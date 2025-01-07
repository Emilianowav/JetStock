import React from "react";
import styles from "./Logo.module.css";
import { FaBoxOpen } from "react-icons/fa";
//modulos

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <FaBoxOpen className={styles.icon} />
        <span className={styles.title}>Stock Manager</span>
      </div>
    </header>
  );
};

export default Header;
