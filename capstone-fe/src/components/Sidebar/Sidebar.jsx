/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeIcon, ProductsIcon, InfoIcon, LocationIcon, BackofficeIcon } from './SvgIcons';
import { Navigation } from '..';
import './styles-sidebar.css';

function Sidebar() {
  const [display, setDisplay] = useState('none');
  return (
    <Box>
      <Typography variant="h3" className="sidebar_logo" textAlign="center">
        G
      </Typography>
      <Stack>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <HomeIcon />
            Home
          </button>
        </Link>
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <ProductsIcon />
            Products
          </button>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <InfoIcon />
            Info
          </button>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button type="button" className="sidebar_button">
            <LocationIcon />
            Location
          </button>
        </Link>
        <div style={{ position: 'relative' }} onMouseEnter={() => setDisplay('flex')} onMouseLeave={() => setDisplay('none')}>
          <Link to="/backoffice" style={{ textDecoration: 'none' }}>

            <button type="button" className="sidebar_button">
              <BackofficeIcon />
              Backoffice
            </button>

          </Link>
          <Navigation display={display} />
        </div>

      </Stack>
    </Box>
  );
}

export default Sidebar;
