import React from "react";
import { Fade, Menu } from "@mui/material";
import DropDownAccList from "./DropDownAccList/DropDownAccList";

interface DropDownAccMenuProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
}

const DropDownAccMenu: React.FC<DropDownAccMenuProps> = ({ open, handleClose, anchorEl }) => {

  return (
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slots={{
        transition: Fade,
      }}
      slotProps={{
        list: {
          'aria-labelledby': 'account-menu-button',
        },
        paper: {
          sx: {
            borderRadius: '15px',
            mt: '5px',
            minWidth: 150,
            color: '#666666',
          },
        },
      }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <DropDownAccList handleClose={handleClose} />
    </Menu>
  );
};

export default DropDownAccMenu;
