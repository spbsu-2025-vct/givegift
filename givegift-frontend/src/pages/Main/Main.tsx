import React from "react";

import NoAdultContentRoundedIcon from "@mui/icons-material/NoAdultContentRounded";
import styles from "./Main.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { GettingStarted } from "../../components/GettingStarted/GettingStarted";
import { Header } from "../../components/Header/Header";
import { IconButton, Tooltip } from "@mui/material";
import { MainSidebarContent } from "../../components/SidebarContent/MainSidebarContent/MainSidebarContent";

// TODO: был чек на isNewUser и показывал GettingStarted
export const Main: React.FC = () => {
    return <div className="app-wrapper">
        <Header />
        <div className={`content-with-sidebar app-wrapper-content`}>
            <Sidebar
                header={
                    <div className={styles.main_header}>
                        <span>Фильтры идей</span>
                        <Tooltip
                            title={"Не показывать / показывать товары 18+"}>
                            <IconButton onClick={() => { /* TODO */ }}>
                                <NoAdultContentRoundedIcon
                                    sx={{ color: true ? "grey" : "#fc4d17" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                }
            >
                <MainSidebarContent />
            </Sidebar>

            <GettingStarted />
        </div>
    </div>
}