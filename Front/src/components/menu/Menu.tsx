import React, { useState, useEffect } from "react";
import { FaCog, FaUser, FaFileAlt, FaAddressBook, FaTruck, FaShoppingCart, FaReceipt } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import MenuButton from "../buttons/MenuButton";
import styles from "./Menu.module.css";
import LogoutButton from "../buttons/LogoutButton";

interface ChangeMenuProps {
  userType?: "admin" | "operador" | null;
  onMenuSelect: (view: string) => void;
  activeView: string;
}

const Menu: React.FC<ChangeMenuProps> = ({ userType, onMenuSelect, activeView }) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser.username);
      } catch (error) {
        console.error("Error al parsear los datos del usuario", error);
      }
    }
  }, []);

  const menuOptions = {
    admin: [
      { id: "productList", label: "Productos", icon: <FaBoxArchive /> },
      { id: "purchaseOrders", label: "Órdenes de Compra", icon: <FaShoppingCart /> },
      { id: "salesOrders", label: "Órdenes de Venta", icon: <FaReceipt /> },
      { id: "providerList", label: "Proveedores", icon: <FaTruck /> },
      { id: "customerList", label: "Clientes", icon: <FaAddressBook /> },
      { id: "reports", label: "Reportes", icon: <FaFileAlt /> },
      { id: "settings", label: "Configuraciones", icon: <FaCog /> },
    ],
    operador: [
      { id: "productList", label: "Productos", icon: <FaBoxArchive /> },
      { id: "purchaseOrders", label: "Órdenes de Compra", icon: <FaShoppingCart /> },
      { id: "salesOrders", label: "Órdenes de Venta", icon: <FaReceipt /> },
      { id: "providerList", label: "Proveedores", icon: <FaTruck /> },
      { id: "customerList", label: "Clientes", icon: <FaAddressBook /> },
      { id: "profile", label: "Perfil", icon: <FaUser /> },
    ],
  };

  const options = menuOptions[userType || "operador"];

  return (
    <div className={styles.menu}>
      <div>
        <div className={styles.greetingContainer}>
          <p className={styles.greeting}>
            <strong>¡Hola! {username} 😄</strong>
          </p>
        </div>
        <div>
          {options.map((option) => (
            <MenuButton
              key={option.id}
              text={option.label}
              onClick={() => onMenuSelect(option.id)}
              icon={option.icon}
              isActive={activeView === option.id}
            />
          ))}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Menu;
