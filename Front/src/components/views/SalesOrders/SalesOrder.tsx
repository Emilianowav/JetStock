import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import styles from "./SalesOrder.module.css";

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
  { key: "customer", label: "Cliente", type: "text", sortable: true },
  { key: "date", label: "Fecha", type: "date", sortable: true },
  { key: "status", label: "Estado", type: "text", sortable: true },
  { key: "total", label: "Total", type: "number", sortable: true },
  { key: "action", label: "Detalle", type: "action", sortable: false },
];

// Datos iniciales de órdenes de venta
const allOrders = [
  { id: 1, customer: "Cliente A", date: "2024-01-01", status: "Pendiente", total: 10000 },
  { id: 2, customer: "Cliente B", date: "2024-01-02", status: "Enviado", total: 7500 },
];

const SalesOrderView: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState(allOrders);

  // Función de búsqueda
  const handleSearch = (term: string) => {
    const updated = allOrders.filter((order) =>
      order.customer.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(updated);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ordenes de Venta</h2>
    
        <SearchBar onSearch={handleSearch} />

      <div>
        {filteredOrders.length > 0 ? (
          <DynamicTable
            columns={columns}
            data={filteredOrders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en orden de venta: ${rowData.customer}`)
            }
          />
        ) : (
          <div className={styles.noData}>No hay datos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default SalesOrderView;
