import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import MarketButton from "../Button/MarketButton/MarketButton";
import type { IProduct, IFavProduct } from "../../../types";
import { Skeleton, Box, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavourites } from "../../../context/FavouritesContext/FavouritesContext";
import TagButton from "../Button/TagButton/TagButton";

const Product: React.FC<IProduct> = ({ title, img_link, market_link }) => {
  const [loaded, setLoaded] = useState(false);
  const { addToFavourites, removeFromFavourites, editFavouritesTag, allUserFavourites } = useFavourites();

  // check if favourited and get its tag
  const favData = allUserFavourites.find(p => p.market_link === market_link) as IFavProduct | undefined;
  const favourited = Boolean(favData);
  const currentTag = favData?.tag ?? "";

  const handleHeartClick = () => {
    if (favourited) {
      removeFromFavourites({ title, img_link, market_link });
    } else {
      addToFavourites({ title, img_link, market_link });
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.productContent}>
        <Box sx={{ width: '100%', position: 'relative', borderRadius: '10px' }}>
          <Tooltip title={`${favourited ? "Убрать из избранного" : "Добавить в избранное"} `} placement="top">
            <IconButton
              className={styles.favButton}
              onClick={handleHeartClick}
            >
              {favourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>

          {favourited && (
            <TagButton
              currentTag={currentTag}
              onSave={newTag =>
                editFavouritesTag(
                  { title, img_link, market_link, tag: currentTag },
                  newTag
                )
              }
            />
          )}

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
