import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useGetProductByIdQuery } from '../../../../../lib/services/kotol-be';

function ProductDetail() {
  const { id } = useParams();
  const { isFetching, data } = useGetProductByIdQuery({ productId: id });

  console.log(data);

  if (isFetching) {
    return (
      <div />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
        {data.name}
      </Typography>
      <Grid container sx={{ position: 'relative' }}>
        <Grid item sx={{ height: '500px', overflow: 'hidden' }} className="productDetail_img_container">
          <img src={data.image_path} alt={data.name} height="500px" width="500px" className="productDetail_img" />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetail;
