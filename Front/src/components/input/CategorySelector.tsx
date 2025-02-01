import React, { useState, useEffect } from "react";
import styles from "./CategorySelector.module.css";

interface CategorySelectorProps {
  onChange: (category: string, subcategory: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onChange }) => {
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // Simulamos la carga de categorías y subcategorías desde un backend
  useEffect(() => {
    setCategories({
      Ropa: ["Remeras", "Zapatos", "Pantalones"],
      Electrónica: ["Celulares", "Computadoras", "Televisores"],
      Hogar: ["Muebles", "Decoración", "Electrodomésticos"],
    });
  }, []);

  // Manejo del cambio en la categoría
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    setSubcategories(categories[selectedValue] || []); // Actualiza subcategorías basadas en la categoría seleccionada
    setSelectedSubcategory(""); // Reinicia la subcategoría seleccionada
    onChange(selectedValue, ""); // Llama a onChange pasando categoría seleccionada y subcategoría vacía
  };

  // Manejo del cambio en la subcategoría
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedSubcategory(selectedValue);
    onChange(selectedCategory, selectedValue); // Llama a onChange pasando categoría y subcategoría
  };

  return (
    <div className={styles.container}>
      {/* Selector de Categoría y Subcategoría */}
      <div className={styles.selectors}>
        <div className={styles.inputGroup}>
          <label htmlFor="category" className={styles.label}>
            Categoría
          </label>
          <select
            id="category"
            className={styles.select}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category} className={styles.option}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subcategory" className={styles.label}>
            Subcategoría
          </label>
          <select
            id="subcategory"
            className={styles.select}
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            disabled={!selectedCategory} // Deshabilitar si no hay categoría seleccionada
          >
            <option value="" disabled>
              Selecciona una subcategoría
            </option>
            {subcategories.map((subcategory) => (
              <option
                key={subcategory}
                value={subcategory}
                className={styles.option}
              >
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
