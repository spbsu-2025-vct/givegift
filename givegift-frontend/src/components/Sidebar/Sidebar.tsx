import React from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ header, children }) => {
  return (
    <div className={`${styles.sidebar} slider`}>
      <div className={`${styles.sidebar_content}`}>
        <span className={styles.sidebar_header}>{header}</span>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
