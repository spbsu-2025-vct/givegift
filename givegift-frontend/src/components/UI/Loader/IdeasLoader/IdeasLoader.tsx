import React from "react";
import loading from "../../../assets/mascot_loading.png";
import styles from "./Loader.module.css";
import { CircularProgress } from "@mui/material";

interface IdeasLoaderProps {
  loadingText: string;
}

export const IdeasLoader: React.FC<IdeasLoaderProps> = ({ loadingText }) => {
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
