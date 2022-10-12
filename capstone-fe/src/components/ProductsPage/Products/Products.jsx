import { Box, CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { categorySelector, searchTermSelector } from '../../../lib/redux/reducers/search';
import { useGetProductsBySearchQuery } from '../../../lib/services/kotol-be';
import Product from './Product/Product';
import './styles-products.css';

function Products() {
  const category = useSelector(categorySelector);
  const searchTerm = useSelector(searchTermSelector);

  const { data, isFetching } = useGetProductsBySearchQuery({ categoryId: category, searchTerm });

  console.log(data);

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
    <Grid className="products_container" container>{data.map((product) => (
      <Product key={data._id} data={product} />
    ))}
    </Grid>
  );
}

export default Products;
