import { Stack } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormIcon, ManagementIcon, OrdersIcon } from './SvgIcons';
import './styles-backoffice.css';

function Navigation({ display }) {
  return (
    <Stack
      direction="row"
      position="absolute"
      display={display}
      sx={{ right: '-300px', top: '0', background: 'linear-gradient(90deg, #dc3d4ade 24%, rgb(225, 36, 52) 100%)' }}
    >
      <NavLink to="/backoffice/orders" style={{ textDecoration: 'none' }}>
        <button type="button" className="backoffice_button">
          <OrdersIcon />
          Orders
        </button>
      </NavLink>
      <NavLink to="/backoffice/management" style={{ textDecoration: 'none' }}>
        <button type="button" className="backoffice_button">
          <ManagementIcon />
          Accounts
        </button>
      </NavLink>
      <NavLink to="/backoffice/newProduct" style={{ textDecoration: 'none' }}>
        <button type="button" className="backoffice_button">
          <FormIcon />
          Add Products
        </button>
      </NavLink>
    </Stack>
  );
}

export default Navigation;
