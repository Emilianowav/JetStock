import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
