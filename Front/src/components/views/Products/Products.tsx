import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import FilterBar from "../../filters/FilterBar";
import styles from "./Products.module.css";
import Button from "../../buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

const ProductList = () => {
  const allProducts = [
    { id: 1, name: "Laptop", category: "Electrónica", status: "Disponible", stock: 1, price: 1000 },
    { id: 2, name: "Mouse", category: "Electrónica", status: "Disponible", stock: 6, price: 25 },
    { id: 3, name: "Keyboard", category: "Electrónica", status: "Agotado", stock: 0, price: 50 },
    ...Array(50).fill({
      id: 0,
      name: "Producto extra",
      category: "Otros",
      status: "Disponible",
      price: 1,
    }),
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const columns: { key: string; label: string; type: "number" | "text" | "date" | "action"; sortable: boolean }[] = [
    { key: "id", label: "ID", type: "number", sortable: true },
    { key: "name", label: "Nombre", type: "text", sortable: true },
    { key: "category", label: "Categoría", type: "text", sortable: false },
    { key: "status", label: "Estado", type: "text", sortable: false },
    { key: "stock", label: "Stock", type: "number", sortable: true },
    { key: "price", label: "Precio", type: "number", sortable: true },
    { key: "action", label: "Editar", type: "action", sortable: false },
  ];

  const handleSearch = (term: string) => {
    const updated = allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(updated);
  };

  const handleFilterChange = (filters: { category?: string; status?: string; priceRange?: [number, number] }) => {
    const updated = allProducts.filter((product) => {
      return (
        (!filters.category || product.category === filters.category) &&
        (!filters.status || product.status === filters.status) &&
        (!filters.priceRange ||
          (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]))
      );
    });
    setFilteredProducts(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Agregar</h3>
          <p className={styles.functionDescription}>Agrega un nuevo producto a tu inventario</p>
          <Button text="Agregar"  icon={<FaPlus />} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Stock</h3>
          <p className={styles.functionDescription}>Administra el stock de tus productos</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>
      <h2 className={styles.title}>Lista de Productos</h2>
      <div className={styles.filters}>
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <DynamicTable
        columns={columns}
        data={filteredProducts}
        onActionClick={(actionKey, rowData) =>
          alert(`Acción ${actionKey} en producto: ${rowData.name}`)
        }
      />
    </div>
  );
};

export default ProductList;
