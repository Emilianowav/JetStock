import React, { useState } from "react";
import styles from "./UpdateStockForm.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import Loader from "../loader/Loader";
import SearchBar from "../filters/SearchBar"; // Un selector para elegir el producto

interface StockFormProps {
  onUpdateStock: (productId: number, stockData: StockData) => Promise<boolean>;
  onCancel: () => void;
}

interface StockData {
  stock: number;
  minStock: number;
}

const UpdateStockForm: React.FC<StockFormProps> = ({ onUpdateStock, onCancel }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [formData, setFormData] = useState<StockData>({ stock: 0, minStock: 0 });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      alert("Por favor, selecciona un producto.");
      return;
    }
    setStatus("loading");

    try {
      const isSuccess = await onUpdateStock(selectedProductId, formData);
      setStatus(isSuccess ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleRetry = () => setStatus("idle");

  if (status === "loading") {
    return <Loader title="Actualizando stock..." />;
  }

  if (status === "success") {
    return (
      <div className={styles.resultContainer}>
        <BiCheckCircle size={48} color="green" />
        <p>El stock se actualizó correctamente.</p>
        <PrimaryButton text="Volver" onClick={onCancel} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.resultContainer}>
        <BiErrorCircle size={48} color="red" />
        <p>Ocurrió un error al actualizar el stock. Por favor, inténtalo nuevamente.</p>
        <PrimaryButton text="Reintentar" onClick={handleRetry} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>Actualizar Stock</h3>
      <div className={styles.divider} />

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Producto*</label>
          <SearchBar onSearch={() => {}} onSelect={(productId) => setSelectedProductId(productId)} />

        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stock" className={styles.label}>Stock Actual*</label>
          <input
            id="stock"
            type="number"
            className={styles.input}
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="minStock" className={styles.label}>Stock Mínimo*</label>
          <input
            id="minStock"
            type="number"
            className={styles.input}
            value={formData.minStock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <PrimaryButton text="Actualizar" icon={<BiCheckCircle />} />
        <button type="button" onClick={onCancel} className={styles.secondaryButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UpdateStockForm;
