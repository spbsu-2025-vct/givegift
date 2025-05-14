import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../DropDownAccMenu.module.css";
import { Divider, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSupabase } from "../../../../context/SupabaseContext/SupabaseContext";
import { RouteNames } from "../../../../router";
interface DropDownAccListProps {
  handleClose: () => void;
}

const DropDownAccList: React.FC<DropDownAccListProps> = ({ handleClose }) => {
  const { supabase } = useSupabase();

  return (
    <>
      <NavLink end to={RouteNames.FAVOURITE} className={styles.acc_menu_item_link}>
        <MenuItem
          onClick={handleClose}
          className={styles.acc_menu_item}
          disableRipple
        >
          <FavoriteBorderIcon />
          <span>Избранное</span>
        </MenuItem>
      </NavLink>


      <Divider sx={{ my: 0.5 }} />

      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <MenuItem
          onClick={() => {
            supabase.auth.signOut();
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