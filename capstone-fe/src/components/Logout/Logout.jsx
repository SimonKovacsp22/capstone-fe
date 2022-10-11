import React from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setUserLogout } from '../../lib/redux/reducers/auth';

function Logout(handleClose) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (

    <MenuItem onClick={() => { localStorage.clear(); dispatch(setUserLogout()); navigate('/'); handleClose(); }}>
      Logout &nbsp;
      <LogoutOutlined />
    </MenuItem>

  );
}

export default Logout;
