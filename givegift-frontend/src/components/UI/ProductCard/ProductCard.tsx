import React from "react";
import styles from "./ProductCard.module.css";
import MarketButton from "../Button/MarketButton/MarketButton";
import type { IProduct } from "../../../types";


const Product: React.FC<IProduct> = ({ title, img_link, market_link }) => {
  return (
    <div className={styles.idea}>
      <div className={styles.ideaContent}>
        <img src={img_link} alt={title} />
        <span className={styles.title}>{title}</span>

        <MarketButton market_link={market_link}>Wildberries</MarketButton>
      </div>
    </div>
  );
};

export default Product;
