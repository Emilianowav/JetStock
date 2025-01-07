import React, { useState, useEffect } from "react";
import styles from "./CategorySelector.module.css";

const CategorySelector = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Simula una petición al backend para obtener categorías
    setTimeout(() => {
      setCategories(["Electrónica", "Hogar", "Ropa"]);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {categories.map((category) => (
          <option key={category} value={category} className={styles.option}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
