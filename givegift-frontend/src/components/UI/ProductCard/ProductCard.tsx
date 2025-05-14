import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import MarketButton from "../Button/MarketButton/MarketButton";
import type { IProduct } from "../../../types";
import { Skeleton, Box } from "@mui/material";

const Product: React.FC<IProduct> = ({ title, img_link, market_link }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.product}>
      <div className={styles.productContent}>
        <Box sx={{ width: '100%', position: 'relative', borderRadius: '10px' }}>
          {!loaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={180}
              sx={{ borderRadius: '10px' }}
            />
          )}

          <img
            src={img_link}
            alt={title}
            onLoad={() => setLoaded(true)}
            style={{
              display: loaded ? 'block' : 'none',
              width: '100%',
              borderRadius: '10px',
            }}
          />
        </Box>

        <span className={styles.title}>{title}</span>

        <MarketButton market_link={market_link}>Wildberries</MarketButton>
      </div>
    </div>
  );
};

export default Product;
