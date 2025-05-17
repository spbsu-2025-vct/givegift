import { Header } from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Favourites.module.css";
import { FavouritesSidebarContent } from "../../components/SidebarContent/FavouritesSidebarContent/FavouritesSidebarContent";
import { FavouritesMainContent } from "../../components/MainContent/FavouritesMainContent/FavouritesMainContent";
import { useFavourites } from "../../context/FavouritesContext/FavouritesContext";
import { useMemo, useState } from "react";
import type { Tag } from "../../types";
import { IconButton, Tooltip } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';

export const Favourites = () => {
    const {
        allUserTags,
        allUserFavourites,
        isUserFavouritesLoading,
        userFavouritesError,
    } = useFavourites();

    const [deletedTags, setDeletedTags] = useState<Tag[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showFavsWithEmptyTags, setShowFavsWithEmptyTags] = useState(true);

    const currentTags = useMemo(
        () => allUserTags.filter((tag) => !deletedTags.includes(tag)),
        [allUserTags, deletedTags]
    );

    const byTag = useMemo(
        () =>
            allUserFavourites.filter(
                (fav) => fav.tag && !deletedTags.includes(fav.tag) ||
                    showFavsWithEmptyTags
            ),
        [allUserFavourites, deletedTags, showFavsWithEmptyTags]
    );

    const filteredFavourites = useMemo(
        () =>
            byTag.filter((fav) =>
                fav.title.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [byTag, searchQuery]
    );

    const removeTag = (tag: Tag) => {
        setDeletedTags((tags) => [...tags, tag]);
    };

    const addTags = (tagsToAdd: Tag[]) => {
        setDeletedTags((prev) =>
            prev.filter((deleted) => !tagsToAdd.includes(deleted))
        );
    };

    return (
        <div className="app-wrapper">
            <Header />
            <div className={`content-with-sidebar app-wrapper-content`}>
                <Sidebar
                    header={
                        <div className={styles.main_header}>
                            <span>{"Избранное"}</span>
                            <Tooltip
                                title={`${showFavsWithEmptyTags ? "Не показывать" : "Показывать"} товары с пустыми тегами`}>
                                <IconButton onClick={() => { setShowFavsWithEmptyTags(!showFavsWithEmptyTags) }}>
                                    <SellIcon
                                        sx={{ color: showFavsWithEmptyTags ? "#fc4d17" : "grey" }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                >
                    <FavouritesSidebarContent
                        currentTags={currentTags}
                        removeTag={removeTag}
                        addTags={addTags}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        allUserTags={allUserTags}
                    />
                </Sidebar>

                <FavouritesMainContent
                    userFavourites={filteredFavourites}
                    userFavouritesError={userFavouritesError}
                    isUserFavouritesLoading={isUserFavouritesLoading}
                />
            </div>
        </div>
    );
};
