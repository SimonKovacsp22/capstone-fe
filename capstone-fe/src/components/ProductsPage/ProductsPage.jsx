import React from 'react';
import { Drawer, Grid, useMediaQuery } from '@mui/material';
import { Categories, Search } from '..';
import Products from './Products/Products';

function ProductsPage() {
  return (
    <Grid container flexDirection="column">
      <Products />
    </Grid>
  );
}

export default ProductsPage;
