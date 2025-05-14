import type { FC, PropsWithChildren } from "react";
import styles from "./SidebarContentBlock.module.css";
import SettingsHeader from "../UI/SettingsHeader/SettingsHeader";


interface SidebarContentBlockType {
    title: string;
}

export const SidebarContentBlock: FC<PropsWithChildren<SidebarContentBlockType>> = ({ title, children }) => {
    return (
        <div className={styles.setting_content}>
            <SettingsHeader text={title} />
            {children}
        </div>
    );
};
