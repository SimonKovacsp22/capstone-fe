import React from 'react';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { Search } from '..';
import './styles-home.css';

function Home() {
  const isXl = useMediaQuery('(min-width:1536px)');
  return (
    <Container xs={{ padding: '0' }}>
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={6} />
        <Grid item xs={12} md={6} lg={6} />
        <Grid item xs={12} md={6} lg={6} />
      </Grid>
    </Container>
  );
}

export default Home;
