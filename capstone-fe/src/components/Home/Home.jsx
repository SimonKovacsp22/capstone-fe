import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { Search } from '..';
import './styles-home.css';

function Home() {
  const isMedium = useMediaQuery('(max-width:900px)');
  const isXs = useMediaQuery('(max-width:450px)');
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
        Home Domain
      </Typography>
      <div className={`${isMedium ? 'home_container' : 'home_container_lg'} `} style={isXs ? { marginInline: 0, width: '100%' } : {}}>

        <img src="../../assets/images/istockphoto-1195856917-612x612-fococlipping-HD (1).png" />
      </div>
    </div>
  );
}

export default Home;
