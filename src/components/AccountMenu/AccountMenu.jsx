import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
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
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          color: '#2E3A4F',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          backgroundColor: '#FFF8ED',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: '#FFF8ED',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem
        sx={{ fontSize: '1.25rem' }}
        onClick={NavigateProfile}
      >My Accout
      </MenuItem>
      <Divider />
      <Logout />

    </Menu>

  );
}

export default AccountMenu;
