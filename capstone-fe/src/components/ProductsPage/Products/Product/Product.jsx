import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addProductToCart } from '../../../../lib/axios';
import { addProduct } from '../../../../lib/redux/reducers/cart';

function Product({ data }) {
  const dispatch = useDispatch();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
    >

      <Card sx={{ maxWidth: 345, padding: '1rem' }}>
        <div className="product_header_categories">

          {data.categories.map((category, i) => (
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              {category.name}{i === 0 ? ',' : ''}
            </Typography>
          ))}

        </div>
        <Link to={`/products/${data._id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            height="220"
            image={data.image_path}
            alt={data.name}
          />
        </Link>
        <CardContent sx={{ paddingLeft: '0', display: 'flex', flexDirection: 'column', padding: 0 }} style={{ paddingBottom: 0 }}>
          <Link to={`/products/${data._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant="subtitle2" textAlign="start" mb=".5rem" fontSize="1rem" ml="4px" className="product_title">
              {data.name}
            </Typography>
          </Link>
          <Rating name="read-only" value={data.rating || 5} readOnly />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockStart: '1rem' }}>
            <Typography gutterBottom variant="subtitle2" textAlign="start" mb={0} ml="4px">
              {data.price}&#8364;
            </Typography>
            <button
              type="button"
              className="product_addToCart_button"
              onClick={() => { addProductToCart(data._id); dispatch(addProduct({ data, quantity: 1 })); }}
            ><ShoppingCartIcon />Add to Cart
            </button>
          </div>

        </CardContent>

      </Card>

    </Grid>
  );
}

export default Product;
