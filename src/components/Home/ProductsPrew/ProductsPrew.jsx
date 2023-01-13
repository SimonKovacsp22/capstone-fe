import { Skeleton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopProducts } from '../../../lib/axios';

function ProductsPrew() {
  const [topProducts, setTopProducts] = useState([]);

  const breakPoint = useMediaQuery('(max-width:1000px)');
  const isSm = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    getTopProducts().then((data) => setTopProducts(data));
  }, []);
  return (
    <div className="home_products_preview">
      {topProducts?.length > 0 ? topProducts.map((product) => (
        <Link key={product._id} to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'unset' }}>
          <div className={`${`home_products_preview_${product.code}_img_cover`}`}>
            <div className={`${`home_products_preview_${product.code}_img`}`} style={{ backgroundImage: `url(${product.image_path})` }} />
            <Typography textAlign="center" marginTop="1.5rem">
              {product.name}
            </Typography>
            <Typography marginTop=".5rem" fontSize="1.3rem" fontWeight="500">
              {product.price.toLocaleString('en-Us')}&#8364;
            </Typography>
          </div>
        </Link>
      )) : (
        <div className="home_products_preview skeleton_container">
          {[0, 1, 2].map((skel) => (
            <div key={skel} className="home_products_preview_skeleton_container">

              <Skeleton variant="rectangular" width={`${breakPoint ? '150px' : '200px'}`} height={`${breakPoint ? '220px' : '270px'}`} />
              <Skeleton width={`${isSm ? '55%' : '90%'}`} height={26} sx={{ marginTop: '1.5rem' }} />
              <Skeleton width={`${isSm ? '33%' : '40%'}`} height={26} sx={{ marginTop: '1.3rem', marginBottom: `${breakPoint ? '2rem' : '0'}` }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPrew;
