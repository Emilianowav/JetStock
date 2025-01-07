import React, { useState, useEffect } from "react";
import styles from "./ProviderSelector.module.css";

const ProviderSelector: React.FC = () => {
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
    setIsSuggestionsVisible(true); // Muestra las sugerencias
  };

  const handleSelect = (provider: string) => {
    setValue(provider); // Establece el valor seleccionado en el input
    setIsSuggestionsVisible(false); // Oculta las sugerencias
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredProviders.length > 0) {
      setValue(filteredProviders[0]); // Establece el primer ítem como seleccionado
      setIsSuggestionsVisible(false); // Oculta las sugerencias
    }
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
          onKeyDown={handleKeyDown}
        />
        {isSuggestionsVisible && filteredProviders.length > 0 && (
          <ul className={styles.suggestions}>
            {filteredProviders.map((provider) => (
              <li
                key={provider}
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
