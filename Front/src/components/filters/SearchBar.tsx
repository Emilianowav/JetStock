"use client";
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from 'react-icons/fa';  // Importamos el ícono de lupa

interface SearchBarProps {
  onSearch: (term: string) => void;
  onSelect?: (productId: number) => void;  // Nueva prop opcional
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // Simulamos la selección de un producto (esto debe venir de una lista en la UI real)
  const handleSelectProduct = (productId: number) => {
    if (onSelect) {
      onSelect(productId);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        <FaSearch size={16} />
      </button>

      {/* Simulación de una lista de productos */}
      <ul className={styles.dropdown}>
        <li onClick={() => handleSelectProduct(1)}>Producto 1</li>
        <li onClick={() => handleSelectProduct(2)}>Producto 2</li>
        <li onClick={() => handleSelectProduct(3)}>Producto 3</li>
      </ul>
    </div>
  );
};


export default SearchBar;
