import React from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setUserLogout } from '../../lib/redux/reducers/auth';
import { setItems } from '../../lib/redux/reducers/cart';

function Logout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (

    <MenuItem onClick={() => { localStorage.clear(); dispatch(setUserLogout()); dispatch(setItems({ products: [], quantity: 0 })); navigate('/'); }} sx={{ fontSize: '1.25rem' }}>
      Logout &nbsp;
      <LogoutOutlined fontSize="medium" />
    </MenuItem>

  );
}

export default Logout;
