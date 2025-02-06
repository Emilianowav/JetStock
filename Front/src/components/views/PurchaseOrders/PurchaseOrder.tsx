import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import styles from "./PurchaseOrder.module.css";
import Button from "../../buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import PurchaseOrderForm from "../../forms/PurchaseOrderForm";
import FormCompletionHandler from "../FormCompletionHandler";

interface OrderData {
  proveedor: string;
  fechaOrden: string;
  fechaEntrega: string;
  productos: Array<{ id: number; cantidad: number; precio: number }>;
  condicionesPago: string;
  tipoEnvio: string;
  direccionEnvio: string;
  observaciones: string;
}
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
  // Agregar más datos si es necesario
];

const PurchaseOrderView: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState(allOrders);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);

  // Función de búsqueda
  const handleSearch = (term: string) => {
    const updated = allOrders.filter((order) =>
      order.supplier.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(updated);
  };

  // Guardar nueva orden de compra
  const handleCreateOrder = async (orderData: OrderData): Promise<boolean> => {
    try {
      console.log("Nueva orden de compra creada:", orderData);
      setFormStatus("success");
      return true;
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      return false;
    }
  };

  // Cancelar acciones
  const handleCancel = () => {
    setShowCreateOrder(false);
    setFormStatus(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Crear</h3>
          <p className={styles.functionDescription}>Crea una nueva orden de compra.</p>
          <Button text="Agregar" icon={<FaPlus />} onClick={() => setShowCreateOrder(true)} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Administrar</h3>
          <p className={styles.functionDescription}>Gestiona tus órdenes de compra existentes.</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Órdenes de Compra</h2>
        <div className={styles.filters}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {showCreateOrder && (
          <div className={styles.modalOverlay}>
            {formStatus === null ? (
              <PurchaseOrderForm onCreateOrder={handleCreateOrder} onCancel={handleCancel} />
            ) : (
              <FormCompletionHandler
                message="Orden creada correctamente."
                status={formStatus}
                onRetry={() => setShowCreateOrder(true)}
                onCancel={handleCancel}
              />
            )}
          </div>
        )}

        {!showCreateOrder && (
          <DynamicTable
            columns={columns}
            data={filteredOrders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en orden de compra: ${rowData.supplier}`)
            }
          />
        )}

        {filteredOrders.length === 0 && (
          <div className={styles.noData}>No hay datos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderView;
