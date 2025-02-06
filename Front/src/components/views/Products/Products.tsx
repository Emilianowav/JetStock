import React, { useState, useEffect } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import FilterBar from "../../filters/FilterBar";
import styles from "./Products.module.css";
import Button from "../../buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import AddProductForm from "../../forms/AddProductForm";
import UpdateStockForm from "../../forms/UpdateStockForm"; 
import FormCompletionHandler from "../FormCompletionHandler";

interface RowData {
  [key: string]: string | number | boolean | undefined;
}
interface StockData {
  stock: number;
  minStock: number;
}
interface ProductData extends RowData {
  id: number;
  title: string;
  description?: string;
  barcode: string;
  supplierId: number;
  price: number;
  costPrice: number;
  discount: number;
  taxRate: number;
  finalPrice: number;
  stock: number;
  minStock: number;
  warehouseLocation: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  status: string;
  availabilityStatus: string;
}

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}

type Filters = {
  category?: string;
  status?: string;
  priceRange?: [number, number];
};

const ProductList = () => {
  const [allProducts, setAllProducts] = useState<ProductData[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false); 
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(""); 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); 

  const itemsPerPage = 10;

  const columns: Column[] = [
    { key: "id", label: "Código", type: "number", sortable: true },
    { key: "title", label: "Nombre", type: "text", sortable: true },
    { key: "category", label: "Categoría", type: "text", sortable: false },
    { key: "availabilityStatus", label: "Estado", type: "text", sortable: false },
    { key: "stock", label: "Stock", type: "number", sortable: true },
    { key: "price", label: "Precio", type: "number", sortable: true },
    { key: "action", label: "Editar", type: "action", sortable: false },
  ];

  // Obtener los productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(""); // Limpiamos errores previos
  
      try {
        const response = await fetch(
          `https://dummyjson.com/products?skip=${currentPage * itemsPerPage}&limit=${itemsPerPage}`
        );
  
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
  
        const data = await response.json();
  
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("La API no devolvió productos válidos");
        }
  
        setAllProducts(data.products);
        setFilteredProducts(data.products);
        
        // Validamos que `data.total` sea un número válido
        const total = typeof data.total === "number" ? data.total : 0;
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [currentPage]); // Se ejecuta cada vez que cambia `currentPage`
  
  const handleSearch = (term: string) => {
    const updated = allProducts.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase()) // Cambié 'name' a 'title'
    );
    setFilteredProducts(updated);
  };

  const handleFilterChange = (filters: Filters) => {
    const updated = allProducts.filter((product) => {
      return (
        (!filters.category || product.category === filters.category) &&
        (!filters.status || product.availabilityStatus === filters.status) &&
        (!filters.priceRange ||
          (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]))
      );
    });
    setFilteredProducts(updated);
  };

  const handleSaveProduct = async (productData: ProductData): Promise<boolean> => {
    try {
      console.log("Producto guardado:", productData);
      setFormStatus("success");
      return true;
    } catch (error) {
      console.error("Error :", error);
      setFormStatus("error");
      return false;
    }
  };

  const handleUpdateStock = async (productId: number, stockData: StockData): Promise<boolean> => {
    try {
      console.log("Stock actualizado:", { productId, ...stockData });
      setFormStatus("success");
      return true;
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      return false;
    }
  };

  const handleCancel = () => {
    setShowAddProduct(false);
    setShowStockForm(false); // Cerramos el formulario de stock
    setFormStatus(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Cambiamos la página actual
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Agregar</h3>
          <p className={styles.functionDescription}>Agrega un nuevo producto a tu inventario.</p>
          <Button text="Agregar" icon={<FaPlus />} onClick={() => setShowAddProduct(true)} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Stock</h3>
          <p className={styles.functionDescription}>Administra el stock de todos tus productos.</p>
          <Button text="Administrar" icon={<FaClipboardList />} onClick={() => setShowStockForm(true)} />
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Lista de Productos</h2>

        {loading && <p>Cargando productos...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.filters}>
          <div className={styles.searchBarContainer}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {showAddProduct && (
          <div className={styles.modalOverlay}>
            {formStatus === null ? (
              <AddProductForm onSave={handleSaveProduct} onCancel={handleCancel} />
            ) : (
              <FormCompletionHandler
                message="Producto guardado correctamente."  
                status={formStatus}
                onRetry={() => setShowAddProduct(true)}
                onCancel={handleCancel}
              />
            )}
          </div>
        )}

        {showStockForm && (
          <div className={styles.modalOverlay}>
            {formStatus === null ? (
              <UpdateStockForm onUpdateStock={handleUpdateStock} onCancel={handleCancel} />
            ) : (
              <FormCompletionHandler
                message="Stock actualizado correctamente."
                status={formStatus}
                onRetry={() => setShowStockForm(true)}
                onCancel={handleCancel}
              />
            )}
          </div>
        )}

        {!showAddProduct && !showStockForm && (
          <>
            <DynamicTable
              columns={columns}
              data={filteredProducts}
              onActionClick={(actionKey, rowData) =>
                alert(`Acción ${actionKey} en producto: ${rowData.title}`) // Cambié 'name' a 'title'
              }
            />

            <div className={styles.pagination}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 0}
              >
                Anterior
              </button>
              <span>Página {currentPage + 1} de {totalPages}</span>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages - 1}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
