import React, { useState } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import default_user_logo from "../../assets/user.svg";
import DropDownAccMenu from "../UI/DropDownAccMenu/DropDownAccMenu";


export const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.header}>
            <NavLink className={styles.logo} to="/">
                ДариДары
            </NavLink>

            <div className={styles.account_settings}>
                <div className={styles.acc_main_info}>
                    <IconButton
                        id="account-menu-button"
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            src={default_user_logo}
                            alt="user"
                            sx={{ width: 50, height: 50 }}
                        />
                    </IconButton>

                    <DropDownAccMenu
                        open={open}
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                    />
                </div>
            </div>
        </div>
    );
};

