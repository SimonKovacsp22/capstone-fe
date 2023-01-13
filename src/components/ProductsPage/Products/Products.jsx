import React from 'react';
import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { categorySelector, searchTermSelector } from '../../../lib/redux/reducers/search';
import { useGetProductsBySearchQuery } from '../../../lib/services/kotol-be';
import Product from './Product/Product';
import ServerAnnouncment from '../../ServerAnnouncment/ServerAnnouncment';
import './styles-products.css';

function Products() {
  const category = useSelector(categorySelector);
  const searchTerm = useSelector(searchTermSelector);

  const { data, isFetching } = useGetProductsBySearchQuery({ category, searchTerm });
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  if (isFetching) {
    return (

      <Grid item container spacing={2} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' }, position: 'relative' }}>
        <>
          <ServerAnnouncment />
          { skeletonArray.map((skeleton) => (
            <Grid item xs={10} sm={6} md={4} lg={4} xl={3} key={skeleton}>
              <Card sx={{ maxWidth: 345, padding: '1rem', marginInline: 'auto', backgroundColor: 'none' }}>
                <Skeleton variant="circular" width={32} height={32} sx={{ marginLeft: 'auto', marginBottom: '1rem' }} />
                <Skeleton variant="rectangular" height={170} />
                <CardContent sx={{ paddingLeft: '0', display: 'flex', flexDirection: 'column', padding: 0 }} style={{ paddingBottom: 0 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1.5rem', margin: '16px 0px 0.5rem 0px' }} />
                  <Skeleton variant="rectangular" width="60%" height={20} sx={{ maxWidth: '125px' }} />
                  <Box display="flex" justifyContent="space-between" mt="1rem">
                    <Skeleton variant="text" sx={{ fontSize: '1.2rem', marginBlock: '.5rem', width: '35%', maxWidth: '60px' }} />
                    <Skeleton variant="rectangular" width="45%" height={40} sx={{ borderRadius: '4px' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </>
      </Grid>

    );
  }
  if (!data) {
    return (
      <Typography variant="h3" fontSize="1.5rem" fontWeight="600" sx={{ color: '#2E3A4F', margin: '4rem 0 0 2rem' }}>
        There is nothing here. Servers are offline.
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
