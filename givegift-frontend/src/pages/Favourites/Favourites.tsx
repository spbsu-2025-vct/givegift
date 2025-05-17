import { Header } from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Favourites.module.css";
import { FavouritesSidebarContent } from "../../components/SidebarContent/FavouritesSidebarContent/FavouritesSidebarContent";
import { FavouritesMainContent } from "../../components/MainContent/FavouritesMainContent/FavouritesMainContent";

// TODO: sidebar
export const Favourites = () => {

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

                <FavouritesMainContent />
            </div>
        </div>
    );
};