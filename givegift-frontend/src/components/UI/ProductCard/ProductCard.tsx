import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import MarketButton from "../Button/MarketButton/MarketButton";
import type { IProduct } from "../../../types";
import { Skeleton, Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavourites } from "../../../context/FavouritesContext/FavouritesContext";

const Product: React.FC<IProduct> = ({ title, img_link, market_link }) => {
  const [loaded, setLoaded] = useState(false);
  const { addToFavourites, allUserFavourites, removeFromFavourites } = useFavourites()

  // По факту, у каждого продукта есть свой id, который зашифрован в ссылке, поэтому можно считать market_link неявным pk
  const [favourited, setFavourited] = useState(allUserFavourites.some((product) => product.market_link === market_link));

  const toggleFavourite = () => {
    setFavourited((prev) => !prev);
    if (favourited) {
      removeFromFavourites({ title, img_link, market_link })
    } else {
      addToFavourites({ title, img_link, market_link })
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.productContent}>
        <Box sx={{ width: '100%', position: 'relative', borderRadius: '10px' }}>
          <IconButton
            className={styles.favButton}
            onClick={toggleFavourite}
            aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
          >
            {favourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

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
              objectFit: "cover",
              maxHeight: "180px",
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
