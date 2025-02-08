// ClienteList.tsx
"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "../../components/tables/DynamicTable";
import styles from "./ClientsView.module.css";
import SearchBar from "../../components/filters/SearchBar";
import Button from "../../components/buttons/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

interface RowData {
  [key: string]: string | number | boolean | undefined;
}
interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}
interface Cliente extends RowData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Aquí podrías obtener los datos de los clientes de una API
    setClientes([
      { id: 1, name: "Cliente A", email: "clientea@example.com", phone: "123456789" },
      { id: 2, name: "Cliente B", email: "clienteb@example.com", phone: "987654321" },
    ]);
  }, []);

  const columns: Column[] = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Nombre", type: "text" },
    { key: "email", label: "Correo Electrónico", type: "text" },
    { key: "phone", label: "Teléfono", type: "text" },
    { key: "action", label: "Ver Más", type: "action", sortable: false },
  ];

  const handleActionClick = (actionKey: string, rowData: Cliente) => {
    // Manejar las acciones, como eliminar o editar
    alert(`Acción: ${actionKey} para ${rowData.name}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.functions}>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Registrar</h3>
          <p className={styles.functionDescription}>Registra a un nuevo  cliente.</p>
          <Button text="Agregar"  icon={<FaPlus />} />
        </div>
        <div className={styles.functionSection}>
          <h3 className={styles.functionTitle}>Modificar</h3>
          <p className={styles.functionDescription}>Modifica los datos  de tus clientes.</p>
          <Button text="Administrar" icon={<FaClipboardList />} />
        </div>
      </div>
      <h2 className={styles.title}>Lista de Clientes</h2>
      <SearchBar onSearch={() => {}} />
      <DynamicTable
        columns={columns}
        data={clientes}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default ClienteList;
