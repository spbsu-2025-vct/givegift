import { Header } from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Favourites.module.css";
import { GettingStarted } from "../../components/GettingStarted/GettingStarted";
import { FavouritesSidebarContent } from "../../components/SidebarContent/FavouritesSidebarContent/FavouritesSidebarContent";
import { useEffect } from "react";
import { useFavourites } from "../../context/FavouritesContext/FavouritesContext";
import { ProductsLoader } from "../../components/UI/Loader/ProductsLoader/ProductsLoader";

export const Favourites = () => {
    const { isUserFavouritesLoading, allUserFavourites } = useFavourites()
    useEffect(() => {
        if (!isUserFavouritesLoading) {
            console.log(allUserFavourites)
        }
    }, [])

    return (
        <div className="app-wrapper">
            <Header />
            <div className={`content-with-sidebar app-wrapper-content`}>
                <Sidebar
                    header={
                        <div className={styles.main_header}>
                            <span>Фильтры идей</span>

                        </div>
                    }
                >
                    <FavouritesSidebarContent />
                </Sidebar>

                {isUserFavouritesLoading ?
                    <ProductsLoader loadingText={"Ищем избранное..."} />
                    : <GettingStarted />}
            </div>
        </div>
    );
};