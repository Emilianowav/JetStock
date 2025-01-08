import React, { useState } from "react";
import DynamicTable from "../../tables/DynamicTable";
import SearchBar from "../../filters/SearchBar";
import styles from "./ProviderList.module.css";
import Button from "../../buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

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

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Agregar</h3>
          <p className={styles.functionDescription}>Agrega un nuevo proveedor a tu lista.</p>
          <Button text="Agregar"  icon={<FaPlus />} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Modificar</h3>
          <p className={styles.functionDescription}>Modifica las informacion de tus proveedores.</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>
      <h2 className={styles.title}>Lista de Proveedores</h2>
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredProviders.length > 0 ? (
          <DynamicTable
            columns={columns}
            data={filteredProviders}
            onActionClick={(actionKey, rowData) =>
              alert(`Acción ${actionKey} en orden de venta: ${rowData.name}`)
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
