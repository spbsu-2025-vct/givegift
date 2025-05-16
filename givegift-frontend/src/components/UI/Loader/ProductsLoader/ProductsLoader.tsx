import React from "react";
import loading from "../../../../assets/mascot_loading.png";
import styles from "./ProductsLoader.module.css";
import { CircularProgress } from "@mui/material";

interface ProductsLoaderProps {
  loadingText: string;
}

export const ProductsLoader: React.FC<ProductsLoaderProps> = ({ loadingText }) => {
  return (
    <div className="slider fadein" style={{ display: "grid" }}>
      <div className={styles.loader}>
        <img src={loading} alt="loading..." />
        <div className={styles.loading_msg}>
          <span className={styles.loading_text}>{loadingText}</span>
          <CircularProgress size="3rem" />
        </div>
      </div>
    </div>
  );
};
