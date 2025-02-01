import React, { useState, useEffect } from "react";
import styles from "./ProviderSelector.module.css";

interface ProviderSelectorProps {
  onChange: (provider: string) => void; // Prop para manejar cambios
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");
  const [providers, setProviders] = useState<string[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Simula una petición al backend para obtener proveedores
    setTimeout(() => {
      setProviders(["Inclusive", "Random", "Remo", "Proveedor D"]);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Filtra los proveedores que coinciden con el texto ingresado
    const filtered = providers.filter((provider) =>
      provider.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProviders(filtered);
    setIsSuggestionsVisible(filtered.length > 0); // Muestra sugerencias solo si hay coincidencias
    onChange(inputValue); // Notifica al padre del cambio
  };

  const handleSelect = (provider: string) => {
    setValue(provider); // Establece el valor seleccionado en el input
    setIsSuggestionsVisible(false); // Oculta las sugerencias
    onChange(provider); // Notifica al padre del cambio
  };

  return (
    <div className={styles.selectors}>
      <div className={styles["select-wrapper"]}>
        <input
          type="text"
          className={styles.input}
          placeholder="Escribe un proveedor"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsSuggestionsVisible(filteredProviders.length > 0)} // Muestra sugerencias al enfocarse
        />
        {isSuggestionsVisible && (
          <ul className={styles.suggestions}>
            {filteredProviders.map((provider, index) => (
              <li
                key={`${provider}-${index}`}
                onClick={() => handleSelect(provider)} // Seleccionar opción al hacer clic
                className={styles.suggestion}
              >
                {provider}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProviderSelector;
