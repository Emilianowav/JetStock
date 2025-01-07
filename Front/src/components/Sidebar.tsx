"use client";
import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import InfoPage from "./views/Info";
import ProductList from "./views/Products/Products";
import ProviderList from "./views/Providers/ProviderList";
import PurchaseOrders from "./views/PurchaseOrders/PurchaseOrder";
import SalesOrders from "./views/SalesOrders/SalesOrder";
import Clients from "./views/Clients/ClientsView";
import Menu from "../components/menu/Menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const [activeView, setActiveView] = useState<string>("info");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userType: "admin" | "operador" | null = "admin";

  // Asegurarse de que el cliente está renderizado
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evitar renderizar en el lado del servidor

  const renderView = () => {
    switch (activeView) {
      case "productList":
        return <ProductList />;
      case "providerList":
        return <ProviderList />;
      case "purchaseOrders":
        return <PurchaseOrders />;
      case "salesOrders":
        return <SalesOrders />;
        case "customerList":
          return <Clients />;
      case "info":
      default:
        return <InfoPage />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <Menu userType={userType} onMenuSelect={(view) => setActiveView(view)} activeView={activeView} />
      </div>
      <div className={styles.content}>{renderView()}</div>
      <div
        className={`${styles.toggleButton} ${isSidebarOpen ? styles.toggleOpen : styles.toggleClosed}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaArrowLeft className={styles.icon} /> : <FaArrowRight className={styles.icon} />}
      </div>
    </div>
  );
};

export default Sidebar;
