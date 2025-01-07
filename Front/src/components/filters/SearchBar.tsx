import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from 'react-icons/fa';  // Importamos el ícono de lupa

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input} // Aplicamos el estilo aquí
      />
      <button onClick={handleSearch} className={styles.button}>
        <FaSearch size={16} /> {/* Ícono de lupa */}
      </button>
    </div>
  );
};

export default SearchBar;
