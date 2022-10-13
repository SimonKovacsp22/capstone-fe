import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout } from '..';

function AccountMenu({ handleClose, open, anchorEl }) {
  const navigate = useNavigate();

  const NavigateProfile = () => {
    navigate('/profile');
    handleClose();
  };
  return (

    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem
        onClick={NavigateProfile}
      >My Accout
      </MenuItem>
      <Logout />

    </Menu>

  );
}

export default AccountMenu;
