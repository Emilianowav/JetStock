// src/views/ProviderList.tsx

import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import styles from "./ProviderList.module.css";
import Button from "../../buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import ProviderForm from "../../forms/AddProviderForm";
import FormCompletionHandler from "../FormCompletionHandler";

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}

const ProviderList: React.FC = () => {
  const allProviders = [
    { id: 1, name: "Proveedor A", contact: "contacto@proveedora.com", phone: "123456789" },
    { id: 2, name: "Proveedor B", contact: "contacto@proveedorb.com", phone: "987654321" },
  ];

  const [filteredProviders, setFilteredProviders] = useState(allProviders);
  const [showCreateProvider, setShowCreateProvider] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);

  const columns: Column[] = [
    { key: "id", label: "ID", type: "number", sortable: true },
    { key: "name", label: "Nombre", type: "text", sortable: true },
    { key: "contact", label: "Contacto", type: "text", sortable: false },
    { key: "phone", label: "Teléfono", type: "text", sortable: false },
    { key: "action", label: "Ver Más", type: "action", sortable: false },
  ];

  const handleSearch = (term: string) => {
    const updated = allProviders.filter((provider) =>
      provider.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProviders(updated);
  };

  const handleCreateProvider = (providerData: { name: string; contact: string; phone: string }) => {
    try {
      console.log("Nuevo proveedor creado:", providerData);
      setFormStatus("success");
      // Aquí se agregarían los datos a la lista
      return true;
    } catch (error) {
      setFormStatus("error");
      return false;
    }
  };

  const handleCancel = () => {
    setShowCreateProvider(false);
    setFormStatus(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Agregar</h3>
          <p className={styles.functionDescription}>Agrega un nuevo proveedor a tu lista.</p>
          <Button text="Agregar" icon={<FaPlus />} onClick={() => setShowCreateProvider(true)} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Modificar</h3>
          <p className={styles.functionDescription}>Modifica las informaciones de tus proveedores.</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>

      <h2 className={styles.title}>Lista de Proveedores</h2>
      <SearchBar onSearch={handleSearch} />

      {showCreateProvider && (
        <div className={styles.modalOverlay}>
          {formStatus === null ? (
            <ProviderForm onSubmit={handleCreateProvider} onCancel={handleCancel} />
          ) : (
            <FormCompletionHandler
              message="Proveedor agregado correctamente"
              status={formStatus}
              onRetry={() => {}}
              onCancel={handleCancel}
            />
          )}
        </div>
      )}

      <div>
        {filteredProviders.length > 0 ? (
          <DynamicTable
            columns={columns}
            data={filteredProviders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en proveedor: ${rowData.name}`)
            }
          />
        ) : (
          <div className={styles.noData}>No hay datos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default ProviderList;
