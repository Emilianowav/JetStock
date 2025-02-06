import React, { useState, useEffect } from "react";
import styles from "./ProviderSelector.module.css";

interface ProviderSelectorProps {
  onChange: (provider: string) => void; // Prop para manejar cambios
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");  // Estado para el valor del input
  const [providers, setProviders] = useState<string[]>([]);  // Estado para la lista de proveedores
  const [filteredProviders, setFilteredProviders] = useState<string[]>([]);  // Estado para los proveedores filtrados
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState<boolean>(false);  // Estado para controlar la visibilidad de las sugerencias

  // Simula una petición para obtener los proveedores
  useEffect(() => {
    setTimeout(() => {
      setProviders(["Inclusive", "Random", "Remo", "Proveedor D"]);
    }, 500);
  }, []);

  // Manejador del cambio de valor en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Filtra los proveedores que coinciden con el valor ingresado
    const filtered = providers.filter((provider) =>
      provider.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProviders(filtered);
    setIsSuggestionsVisible(filtered.length > 0); // Solo mostrar sugerencias si hay coincidencias
    onChange(inputValue); // Notifica al componente padre
  };

  // Manejador cuando se selecciona un proveedor
  const handleSelect = (provider: string) => {
    setValue(provider);  // Establece el valor del input al proveedor seleccionado
    setIsSuggestionsVisible(false);  // Oculta las sugerencias
    onChange(provider);  // Notifica al componente padre
  };

  return (
    <div className={styles.selectors}>
      <div className={styles.selectWrapper}>
        <label className={styles.label} htmlFor="provider">Proveedor</label>
        <input
          id="provider"
          type="text"
          className={styles.input}
          placeholder="Escribe un proveedor"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsSuggestionsVisible(filteredProviders.length > 0)} // Muestra sugerencias al enfocar el input
        />
        {isSuggestionsVisible && (
          <ul className={styles.suggestions}>
            {filteredProviders.map((provider, index) => (
              <li
                key={`${provider}-${index}`}
                onClick={() => handleSelect(provider)} // Selección del proveedor al hacer clic
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
