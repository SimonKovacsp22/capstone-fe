import React from 'react';
import { Drawer, Grid, useMediaQuery } from '@mui/material';
import { Sidebar, Search } from '..';
import Products from './Products/Products';
import './styles-productsPage.css';

function ProductsPage() {
  const isMedium = useMediaQuery('(max-width:900px)');
  const isXl = useMediaQuery('(min-width:1536px)');
  const isLg = useMediaQuery('(min-width:900px)');
  return (
    <>

      {!isMedium && (
      <Drawer variant="permanent" open className="navbar_drawer_perm_paper">
        <Sidebar />
      </Drawer>
      )}

      <Grid container flexDirection="column" className={`${isLg ? 'products-page_container_lg' : 'products-page_container'} `}>
        <Search />
        <Products />
      </Grid>
    </>
  );
}

export default ProductsPage;
