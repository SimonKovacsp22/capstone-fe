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
  if (!data.length) {
    return (
      <div>
        There is nothing here.
      </div>
    );
  }

  return (

    <Grid flexDirection="column" width="100%" textAlign="center">
      <Typography variant="h3">
        All products
      </Typography>
      <Grid item container spacing={2}>

        {data.map((product) => (
          <Product key={uuidv4()} data={product} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Products;
