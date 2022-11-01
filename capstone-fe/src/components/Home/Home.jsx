import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { Search } from '..';
import './styles-home.css';

function Home() {
  const isMedium = useMediaQuery('(max-width:900px)');
  const isXs = useMediaQuery('(max-width:450px)');
  return (
    <div className="home_container">
      <div>
        <div className="home_logo_and_tapestry_container">
          <Typography className="home_logo">
            <span>G</span>amaja
          </Typography>
          <div className="home_tapestry" />
        </div>
      </div>
    </div>
  );
}

export default Home;
