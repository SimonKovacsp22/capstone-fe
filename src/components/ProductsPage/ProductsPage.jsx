import React, { useState } from 'react';
import { SwipeableDrawer, Grid, Typography, useMediaQuery, Box } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { SidebarTree } from '..';
import Products from './Products/Products';

function ProductsPage() {
  const isLg = useMediaQuery('(min-width:1200px)');
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <Box display="flex" flexDirection="column" width="100%" position="relative">
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: '1rem', marginBlockEnd: '1rem', color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
        All products
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between', height: '100%' }}>

        <Grid item container sx={{ flexDirection: { xs: 'row', sm: 'column' } }} lg={8}>
          <Products />

        </Grid>
        { isLg ? (
          <Grid item className="productsPage_tree_container" lg={3} sx={{ maxWidth: { xs: '100%', xl: '25%' } }}>

            <SidebarTree />
          </Grid>
        ) : (
          <>
            <button type="button" className="productsPage_drawer_open_button" onClick={() => setOpen(true)}>
              <ArrowBackIosNewOutlinedIcon />
            </button>
            <SwipeableDrawer
              anchor="right"
              open={open}
              onClose={toggleDrawer}
              onOpen={toggleDrawer}
            >
              <SidebarTree />
            </SwipeableDrawer>
          </>
        )}
      </Grid>

    </Box>
  );
}

export default ProductsPage;
