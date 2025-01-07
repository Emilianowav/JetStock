import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import styles from "./PurchaseOrder.module.css";

// Definición de la interfaz para columnas
interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}

// Configuración de columnas de la tabla
const columns: Column[] = [
  { key: "id", label: "ID", type: "number", sortable: true },
  { key: "supplier", label: "Proveedor", type: "text", sortable: true },
  { key: "date", label: "Fecha", type: "date", sortable: true },
  { key: "status", label: "Estado", type: "text", sortable: true },
  { key: "total", label: "Total", type: "number", sortable: true },
  { key: "action", label: "Detalle", type: "action", sortable: false },
];

// Datos iniciales de órdenes de compra
const allOrders = [
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
  { id: 1, supplier: "Proveedor A", date: "2024-01-01", status: "Pendiente", total: 12000 },
  { id: 2, supplier: "Proveedor B", date: "2024-01-02", status: "Enviado", total: 9500 },
];

const PurchaseOrderView: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState(allOrders);

  // Función de búsqueda
  const handleSearch = (term: string) => {
    const updated = allOrders.filter((order) =>
      order.supplier.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(updated);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ordenes de Compra</h2>

        <SearchBar onSearch={handleSearch} />


        {filteredOrders.length > 0 ? (
          <DynamicTable
            columns={columns}
            data={filteredOrders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en orden de compra: ${rowData.supplier}`)
            }
          />
        ) : (
          <div className={styles.noData}>No hay datos disponibles.</div>
        )}

    </div>
  );
};

export default PurchaseOrderView;
