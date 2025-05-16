import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import MarketButton from "../Button/MarketButton/MarketButton";
import type { IProduct, IFavProduct } from "../../../types";
import {
  Skeleton,
  Box,
  IconButton,
  Popover,
  TextField
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from "@mui/icons-material/Check";

import { useFavourites } from "../../../context/FavouritesContext/FavouritesContext";

const Product: React.FC<IProduct> = ({ title, img_link, market_link }) => {
  const [loaded, setLoaded] = useState(false);
  const { addToFavourites, removeFromFavourites, editFavouritesTag, allUserFavourites } = useFavourites();

  // find if this product is in the user's favourites, and grab its tag
  const favData = allUserFavourites.find((p) => p.market_link === market_link) as IFavProduct | undefined;
  const favourited = Boolean(favData);
  const currentTag = favData?.tag;

  // popover & editor state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverOpen = Boolean(anchorEl);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTag, setEditedTag] = useState(currentTag || "");

  useEffect(() => {
    // if the tag in context changes, keep our editedTag in sync
    setEditedTag(currentTag || "");
  }, [currentTag]);

  const handleBookmarkClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsEditing(false);
  };

  const handleSaveTag = async () => {
    if (!favData) return;
    await editFavouritesTag(
      { title, img_link, market_link, tag: currentTag },
      editedTag
    );
    setIsEditing(false);
  };

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
          {/* right-top heart */}
          <IconButton
            className={styles.favButton}
            onClick={handleHeartClick}
          >
            {favourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {/* left-top bookmark (only if favourited) */}
          {favourited && (
            <IconButton
              className={styles.bookmarkButton}
              onClick={handleBookmarkClick}
            >
              {popoverOpen ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          )}

          {/* popover with tag + edit UI */}
          <Popover
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Box sx={{
              padding: "10px 15px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              height: '40px'
            }}>
              <TextField
                size="small"
                value={editedTag}
                onChange={(e) => setEditedTag(e.target.value)}
                placeholder="нет тега"
                disabled={!isEditing}
                sx={{ maxWidth: '200px' }}
              />
              <Box>
                {isEditing ? (
                  <IconButton
                    size="small"
                    onClick={handleSaveTag}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>)
                  : (
                    <IconButton
                      size="small"
                      onClick={() => setIsEditing(true)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )
                }

              </Box>
            </Box>
          </Popover>

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
