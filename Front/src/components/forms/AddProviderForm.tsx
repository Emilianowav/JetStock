// src/forms/ProviderForm.tsx
"use client";
import React, { useState } from "react";
import styles from "./AddProviderForm.module.css";

interface ProviderFormProps {
  onSubmit: (formData: { name: string; contact: string; phone: string }) => void;
  onCancel: () => void;
}

const ProviderForm: React.FC<ProviderFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, contact, phone });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Agregar Proveedor</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="contact">Contacto</label>
        <input
          id="contact"
          type="email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn}>
          Guardar
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProviderForm;
