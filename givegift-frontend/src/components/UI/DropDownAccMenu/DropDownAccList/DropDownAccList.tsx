import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../DropDownAccMenu.module.css";
import { Divider, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
interface DropDownAccListProps {
  handleClose: () => void;
}

const DropDownAccList: React.FC<DropDownAccListProps> = ({ handleClose }) => {

  return (
    <>
      <NavLink end to="/account/0" className={styles.acc_menu_item_link}>
        <MenuItem
          onClick={handleClose}
          className={styles.acc_menu_item}
          disableRipple
        >
          <PersonIcon />
          <span>Профиль</span>
        </MenuItem>
      </NavLink>


      <Divider sx={{ my: 0.5 }} />

      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          disableRipple
          className={styles.acc_menu_item}
          style={{ color: "#ff6332" }}
        >
          <LogoutIcon />
          <span>Выйти</span>
        </MenuItem>
      </NavLink>
    </>
  );
};

export default DropDownAccList;