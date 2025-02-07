import React, { useState } from "react";
import DynamicTable from "../../components/tables/DynamicTable";
import SearchBar from "../../components/filters/SearchBar";
import styles from "./SalesOrder.module.css";
import Button from "../../components/buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import SalesOrderForm from "../../components/forms/SaleOrderForm";
import FormCompletionHandler from "../../components/forms/FormCompletionHandler";

interface SaleData {
  cliente: string;
  fechaVenta: string;
  productos: Array<{ id: number; cantidad: number; precio: number }>;
  metodoPago: string;
  direccionEnvio: string;
  observaciones: string;
}
interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}

const columns: Column[] = [
  { key: "id", label: "ID", type: "number", sortable: true },
  { key: "customer", label: "Cliente", type: "text", sortable: true },
  { key: "date", label: "Fecha", type: "date", sortable: true },
  { key: "status", label: "Estado", type: "text", sortable: true },
  { key: "total", label: "Total", type: "number", sortable: true },
  { key: "action", label: "Detalle", type: "action", sortable: false },
];

const allOrders = [
  { id: 1, customer: "Cliente A", date: "2024-01-01", status: "Pendiente", total: 10000 },
  { id: 2, customer: "Cliente B", date: "2024-01-02", status: "Enviado", total: 7500 },
];

const SalesOrderView: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState(allOrders);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);

  const handleSearch = (term: string) => {
    const updated = allOrders.filter((order) =>
      order.customer.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(updated);
  };

  const handleCreateOrder = async (orderData: SaleData): Promise<boolean> => {
    try {
      console.log("Nueva orden de venta creada:", orderData);
      setFormStatus("success");
      return true;
    } catch (error) {
      console.error("Error :", error);
      setFormStatus("error");
      return false;
    }
  };

  const handleCancel = () => {
    setShowCreateOrder(false);
    setFormStatus(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Crear</h3>
          <p className={styles.functionDescription}>Crea una nueva orden de venta.</p>
          <Button text="Agregar" icon={<FaPlus />} onClick={() => setShowCreateOrder(true)} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Administrar</h3>
          <p className={styles.functionDescription}>Gestiona tus órdenes de venta existentes.</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Órdenes de Venta</h2>
        <div className={styles.filters}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* MODAL PARA CREAR ORDEN */}
        {showCreateOrder && (
          <div className={styles.modalOverlay}>
            {formStatus === null ? (
              <SalesOrderForm onCreateSale={handleCreateOrder} onCancel={handleCancel} />
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

        {/* TABLA DE ÓRDENES SOLO SI NO HAY MODAL */}
        {!showCreateOrder && (
          <DynamicTable
            columns={columns}
            data={filteredOrders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en orden de venta: ${rowData.customer}`)
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

export default SalesOrderView;
