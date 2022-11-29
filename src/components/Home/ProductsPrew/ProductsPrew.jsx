import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopProducts } from '../../../lib/axios';

function ProductsPrew() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getTopProducts().then((data) => setTopProducts(data));
  }, []);
  return (
    <div className="home_products_preview">
      {topProducts?.length > 0 && topProducts.map((product) => (
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
      ))}
    </div>
  );
}

export default ProductsPrew;
