import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { categorySelector, searchTermSelector } from '../../../lib/redux/reducers/search';
import { useGetProductsBySearchQuery } from '../../../lib/services/kotol-be';
import Product from './Product/Product';
import './styles-products.css';

function Products() {
  const category = useSelector(categorySelector);
  const searchTerm = useSelector(searchTermSelector);

  const { data, isFetching } = useGetProductsBySearchQuery({ category, searchTerm });

  if (isFetching) {
    return (

      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>

    );
  }
  if (!data) {
    return (
      <Typography variant="h3" fontSize="1.5rem" fontWeight="600" sx={{ color: '#2E3A4F', margin: '4rem 0 0 2rem' }}>
        There is nothing here. You are offline.
      </Typography>
    );
  }

  return (

    <Grid item container spacing={2} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
      {data.length > 0 ? data.map((product) => (
        <Product key={uuidv4()} data={product} />
      )) : (
        <Typography variant="h3" fontSize="1.5rem" fontWeight="600" sx={{ color: '#2E3A4F', margin: '4rem 0 0 2rem' }}>
          There is nothing here. Try searching for something else.
        </Typography>
      ) }
    </Grid>

  );
}

export default Products;
