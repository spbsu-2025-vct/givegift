import React, { useEffect } from "react";

import NoAdultContentRoundedIcon from "@mui/icons-material/NoAdultContentRounded";
import styles from "./Main.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { GettingStarted } from "../../components/GettingStarted/GettingStarted";
import { Header } from "../../components/Header/Header";
import { IconButton, Tooltip } from "@mui/material";
import { MainSidebarContent } from "../../components/SidebarContent/MainSidebarContent/MainSidebarContent";
import { useIdeas } from "../../context/IdeasContext/IdeasContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Ideas } from "../../components/Ideas/Ideas";
import { useInterests } from "../../context/InterestContext/InterestContext";

// TODO: был чек на isNewUser и показывал GettingStarted
export const Main: React.FC = () => {
    const { isAdult, setIsAdult } = useIdeas();
    const [isNewUser, setIsNewUser] = useLocalStorage("isNewUser", true);

    const { fetchInterests } = useInterests();
    useEffect(() => { fetchInterests() }, []);

    return <div className="app-wrapper">
        <Header />
        <div className={`content-with-sidebar app-wrapper-content`}>
            <Sidebar
                header={
                    <div className={styles.main_header}>
                        <span>Фильтры идей</span>
                        <Tooltip
                            title={"Не показывать / показывать товары 18+"}>
                            <IconButton onClick={() => { setIsAdult(!isAdult) }}>
                                <NoAdultContentRoundedIcon
                                    sx={{ color: isAdult ? "grey" : "#fc4d17" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                }
            >
                <MainSidebarContent />
            </Sidebar>

            {isNewUser ? <GettingStarted /> : <Ideas />}
        </div>
    </div>
}