"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./Sidebar.module.css";
import { AuthContext } from "../app/context/AuthContext";
import InfoPage from "./views/Info";
import ProductList from "./views/Products/Products";
import ProviderList from "./views/Providers/ProviderList";
import PurchaseOrders from "./views/PurchaseOrders/PurchaseOrder";
import SalesOrders from "./views/SalesOrders/SalesOrder";
import Clients from "./views/Clients/ClientsView";
import Menu from "../components/menu/Menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [activeView, setActiveView] = useState<string>("info");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirige al login si no hay usuario
    }
  }, [user, router]);

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

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <Menu userType={auth?.user?.userType || "operador"} onMenuSelect={(view) => setActiveView(view)} activeView={activeView} />
      </div>
      <div className={styles.content}>{renderView()}</div>
      <div
        className={`${styles.toggleButton} ${isSidebarOpen ? styles.toggleOpen : styles.toggleClosed}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaArrowLeft className={styles.icon} /> : <FaArrowRight className={styles.icon} />}
      </div>
    </div>
  );
};

export default Sidebar;
