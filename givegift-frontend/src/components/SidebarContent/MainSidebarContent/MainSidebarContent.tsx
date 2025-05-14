import type { FC } from "react";
import styles from "./MainSidebarContent.module.css";
import IdeasSettings from "../../IdeasSettings/IdeasSettings";

export const MainSidebarContent: FC = () => {
    return (
        <div className={styles.mainpage_sidebar_content}>
            <IdeasSettings />
        </div>
    )
};
