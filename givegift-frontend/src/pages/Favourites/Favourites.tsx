import { Header } from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Favourites.module.css";
import { FavouritesSidebarContent } from "../../components/SidebarContent/FavouritesSidebarContent/FavouritesSidebarContent";
import { FavouritesMainContent } from "../../components/MainContent/FavouritesMainContent/FavouritesMainContent";
import { useFavourites } from "../../context/FavouritesContext/FavouritesContext";
import { useMemo, useState } from "react";
import type { Tag } from "../../types";


export const Favourites = () => {
    const {
        allUserTags,
        allUserFavourites,
        isUserFavouritesLoading,
        userFavouritesError,
    } = useFavourites();

    const [deletedTags, setDeletedTags] = useState<Tag[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // 1) Filter out deleted tags
    const currentTags = useMemo(
        () => allUserTags.filter((tag) => !deletedTags.includes(tag)),
        [allUserTags, deletedTags]
    );

    // 2) Filter out deleted‐tagged products
    const byTag = useMemo(
        () =>
            allUserFavourites.filter(
                (fav) => fav.tag && !deletedTags.includes(fav.tag)
            ),
        [allUserFavourites, deletedTags]
    );

    // 3) Then filter that set by your search string
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

    return (
        <div className="app-wrapper">
            <Header />
            <div className={`content-with-sidebar app-wrapper-content`}>
                <Sidebar
                    header={
                        <div className={styles.main_header}>
                            <span>Фильтры избранного</span>
                        </div>
                    }
                >
                    <FavouritesSidebarContent
                        currentTags={currentTags}
                        removeTag={removeTag}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
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
