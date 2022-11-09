import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTopProducts } from '../../../lib/axios';

function ProductsPrew() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getTopProducts().then((data) => setTopProducts(data));
  }, []);
  return (
    <div className="home_products_preview">
      {topProducts.length > 0 && topProducts.map((product) => (
        <div key={product._id} className={`${`home_products_preview_${product.code}_img_cover`}`}>
          <div className={`${`home_products_preview_${product.code}_img`}`} style={{ backgroundImage: `url(${product.image_path})` }} />
          <Typography textAlign="center" marginTop="1.5rem">
            {product.name}
          </Typography>
          <Typography marginTop=".5rem" fontSize="1.3rem" fontWeight="500">
            {product.price.toLocaleString('en-Us')}&#8364;
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default ProductsPrew;
