import React, { useState } from 'react';
import styles from './Price.module.css';

interface PriceModuleProps {
  price: number;
  iva: number;
  onPriceChange: (price: number) => void;
  onIvaChange: (iva: number) => void;
}

const PriceModule: React.FC<PriceModuleProps> = ({ price, iva, onPriceChange, onIvaChange }) => {
  const [profitPercentage, setProfitPercentage] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // 🧮 Calculamos el precio con IVA
  const priceWithIVA = price * (1 + iva);

  // 🔢 Aplicamos el descuento y la ganancia
  const discountFactor = 1 - discountPercentage / 100;
  const profitFactor = 1 + profitPercentage / 100;
  const finalPrice = priceWithIVA * discountFactor * profitFactor;

  // 🏷️ Manejadores de cambio
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      onPriceChange(newPrice);
    }
  };

  const handleIvaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIva = parseFloat(e.target.value);
    onIvaChange(newIva);
  };

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProfitPercentage = parseFloat(e.target.value);
    if (!isNaN(newProfitPercentage)) {
      setProfitPercentage(newProfitPercentage);
    }
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiscountPercentage = parseFloat(e.target.value);
    if (!isNaN(newDiscountPercentage)) {
      setDiscountPercentage(newDiscountPercentage);
    }
  };

  return (
    <div className={styles.priceModule}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="price" className={styles.label}>Precio*</label>
          <input
            id="price"
            type="number"
            className={styles.input}
            value={price.toString()}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="iva" className={styles.label}>Tipo de IVA*</label>
          <select
            id="iva"
            className={styles.select}
            value={iva}
            onChange={handleIvaChange}
            required
          >
            <option value={0}>IVA 0%</option>
            <option value={0.105}>IVA 10.5%</option>
            <option value={0.21}>IVA 21%</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="profit" className={styles.label}>Ganancia (%)</label>
          <input
            id="profit"
            type="number"
            className={styles.input}
            value={profitPercentage.toString()}
            onChange={handleProfitChange}
            min="0"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="discount" className={styles.label}>Descuento (%)</label>
          <input
            id="discount"
            type="number"
            className={styles.input}
            value={discountPercentage.toString()}
            onChange={handleDiscountChange}
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* 📌 Sección de Totales */}
      <div className={styles.totalBox}>
        <label className={styles.label}>Precio con IVA</label>
        <span>{priceWithIVA.toFixed(2)} ARS</span>
      </div>

      <div className={styles.totalBox}>
        <label className={styles.label}>Precio Final</label>
        <span>{finalPrice.toFixed(2)} ARS</span>
      </div>
    </div>
  );
};

export default PriceModule;
