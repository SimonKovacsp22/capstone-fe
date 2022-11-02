/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon, ProductsIcon, InfoIcon, LocationIcon, BackofficeIcon } from './SvgIcons';
import { Navigation } from '..';

import { userSelector } from '../../lib/redux/reducers/auth';
import './styles-sidebar.css';

function Sidebar() {
  const { user } = useSelector(userSelector);
  const [display, setDisplay] = useState('none');
  return (
    <Box>
      <Typography variant="h3" className="sidebar_logo" textAlign="center">
        G
      </Typography>
      <Stack>
        <NavLink to="/home" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <HomeIcon />
            Home
          </button>
        </NavLink>
        <NavLink to="/products" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <ProductsIcon />
            Products
          </button>
        </NavLink>
        <NavLink to="/about-us" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <InfoIcon />
            About us
          </button>
        </NavLink>
        <NavLink to="/location" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <LocationIcon />
            Location
          </button>
        </NavLink>
        {user && user.role === 'admin' && (
        <div style={{ position: 'relative' }} onMouseEnter={() => setDisplay('flex')} onMouseLeave={() => setDisplay('none')}>
          <NavLink to="/backoffice" style={{ textDecoration: 'none' }}>

            <button type="button" className="sidebar_button">
              <BackofficeIcon />
              Backoffice
            </button>

          </NavLink>
          <Navigation display={display} />
        </div>
        )}

      </Stack>
    </Box>
  );
}

export default Sidebar;
