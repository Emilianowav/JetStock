"use client";
import React from "react";
import styles from "./Info.module.css";
import { FaInfoCircle } from "react-icons/fa";

const InfoPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconBackground}>
            <FaInfoCircle className={styles.icon} />
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Información Importante</h1>
        <p className={styles.text}>
            Este ícono de información estará disponible en toda la aplicación
            para ofrecer información para un mejor uso de las funciones. Mantente atento a los mensajes
            que puedan aparecer para mejorar tu experiencia.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;
