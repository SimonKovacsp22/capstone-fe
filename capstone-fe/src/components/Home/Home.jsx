import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { searchSelector } from '../../lib/redux/reducers/search';
import { useGetProductsByCategoryQuery } from '../../lib/services/kotol-be';

function Home() {
  const { category } = useSelector(searchSelector);

  const { data, isFetching } = useGetProductsByCategoryQuery({ categoryId: category });

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
      <p>There is nothing here</p>
    );
  }

  return (
    <div style={{ fontSize: '10rem' }}>{data[0]._id}</div>
  );
}

export default Home;
