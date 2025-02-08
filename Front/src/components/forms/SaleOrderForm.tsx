"use client";
import React, { useState } from "react";
import styles from "./SaleOrderForm.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import Loader from "../loader/Loader";
import SearchBar from "../filters/SearchBar"; // Componente para seleccionar productos

interface SalesFormProps {
  onCreateSale: (saleData: SaleData) => Promise<boolean>;
  onCancel: () => void;
}

interface SaleData {
  cliente: string;
  fechaVenta: string;
  productos: Array<{ id: number; cantidad: number; precio: number }>;
  metodoPago: string;
  direccionEnvio: string;
  observaciones: string;
}

const SalesForm: React.FC<SalesFormProps> = ({ onCreateSale, onCancel }) => {
  const [formData, setFormData] = useState<SaleData>({
    cliente: "",
    fechaVenta: "",
    productos: [],
    metodoPago: "",
    direccionEnvio: "",
    observaciones: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const isSuccess = await onCreateSale(formData);
      setStatus(isSuccess ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleRetry = () => setStatus("idle");

  if (status === "loading") {
    return <Loader title="Registrando venta..." />;
  }

  if (status === "success") {
    return (
      <div className={styles.resultContainer}>
        <BiCheckCircle size={48} color="green" />
        <p>La venta fue registrada correctamente.</p>
        <PrimaryButton text="Volver" onClick={onCancel} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.resultContainer}>
        <BiErrorCircle size={48} color="red" />
        <p>Ocurrió un error al registrar la venta. Por favor, inténtalo nuevamente.</p>
        <PrimaryButton text="Reintentar" onClick={handleRetry} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>Registrar Venta</h3>

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Cliente*</label>
          <input
            id="cliente"
            type="text"
            className={styles.input}
            value={formData.cliente}
            onChange={handleChange}
            placeholder="Nombre o Razón Social"
            required
          />
        </div>

        {/* Fecha de Venta */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Fecha de Venta*</label>
          <input
            id="fechaVenta"
            type="date"
            className={styles.input}
            value={formData.fechaVenta}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      {/* Productos */}
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Productos*</label>
          <SearchBar onSearch={() => {}} />
        </div>
      </div>

      {/* Método de Pago */}
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Método de Pago*</label>
          <select
            id="metodoPago"
            className={styles.input}
            value={formData.metodoPago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia Bancaria</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Dirección de Envío</label>
          <input
            id="direccionEnvio"
            type="text"
            className={styles.input}
            value={formData.direccionEnvio}
            onChange={handleChange}
            placeholder="Ingrese la dirección (opcional)"
          />
        </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Observaciones</label>
          <textarea
            id="observaciones"
            className={styles.textArea}
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Notas adicionales (opcional)"
          />
        </div>

      <div className={styles.buttons}>
        <PrimaryButton text="Registrar Venta" icon={<BiCheckCircle />} />
        <button type="button" onClick={onCancel} className={styles.secondaryButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default SalesForm;
