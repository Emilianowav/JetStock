"use client";
import React, { useState } from "react";
import styles from "./PurchaseOrderForm.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import Loader from "../loader/Loader";
import SearchBar from "../filters/SearchBar"; // Un selector para elegir el producto

interface BurOrderFormProps {
  onCreateOrder: (orderData: OrderData) => Promise<boolean>;
  onCancel: () => void;
}

interface OrderData {
  proveedor: string;
  fechaOrden: string;
  fechaEntrega: string;
  productos: Array<{ id: number; cantidad: number; precio: number }>;
  condicionesPago: string;
  tipoEnvio: string;
  direccionEnvio: string;
  observaciones: string;
}

const OrdenDeCompraForm: React.FC<BurOrderFormProps> = ({ onCreateOrder, onCancel }) => {
  const [formData, setFormData] = useState<OrderData>({
    proveedor: "",
    fechaOrden: "",
    fechaEntrega: "",
    productos: [],
    condicionesPago: "",
    tipoEnvio: "",
    direccionEnvio: "",
    observaciones: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const isSuccess = await onCreateOrder(formData);
      setStatus(isSuccess ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleRetry = () => setStatus("idle");

  if (status === "loading") {
    return <Loader title="Creando orden de compra..." />;
  }

  if (status === "success") {
    return (
      <div className={styles.resultContainer}>
        <BiCheckCircle size={48} color="green" />
        <p>La orden de compra fue creada correctamente.</p>
        <PrimaryButton text="Volver" onClick={onCancel} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.resultContainer}>
        <BiErrorCircle size={48} color="red" />
        <p>Ocurrió un error al crear la orden de compra. Por favor, inténtalo nuevamente.</p>
        <PrimaryButton text="Reintentar" onClick={handleRetry} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>Crear Orden de Compra</h3>
      <div className={styles.divider} />

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Proveedor*</label>
          <select
            id="proveedor"
            className={styles.input}
            value={formData.proveedor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Proveedor</option>
            <option value="Proveedor 1">Proveedor 1</option>
            <option value="Proveedor 2">Proveedor 2</option>
            {/* Otras opciones de proveedores */}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Fecha de Orden*</label>
          <input
            id="fechaOrden"
            type="date"
            className={styles.input}
            value={formData.fechaOrden}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Otra opcion*</label>
          <input
            id="fechaEntrega"
            type="date"
            className={styles.input}
            value={formData.fechaEntrega}
            onChange={handleChange}
            required
          />
        </div>
        </div>

        <div className={styles.inputsContainer}>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Productos*</label>
            <SearchBar onSearch={() => {}} />
          </div>
        </div>

        <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Condiciones de Pago*</label>
          <select
            id="condicionesPago"
            className={styles.input}
            value={formData.condicionesPago}
            onChange={handleChange}
            required
          >
            <option value="contado">Contado</option>
            <option value="credito30">Crédito 30 días</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Tipo de Envío*</label>
          <select
            id="tipoEnvio"
            className={styles.input}
            value={formData.tipoEnvio}
            onChange={handleChange}
            required
          >
            <option value="domicilio">Envío a Domicilio</option>
            <option value="tienda">Recogida en Tienda</option>
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
          />
        </div>
          </div>

{/* hasta ca  */}

          <div className={styles.inputsContainer}>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Observaciones</label>
            <textarea
              id="observaciones"
              className={styles.textArea}
              value={formData.observaciones}
              onChange={handleChange}
            />
          </div>
          </div>

      <div className={styles.buttons}>
        <PrimaryButton text="Crear Orden" icon={<BiCheckCircle />} />
        <button type="button" onClick={onCancel} className={styles.secondaryButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default OrdenDeCompraForm;
