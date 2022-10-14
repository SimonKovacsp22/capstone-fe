import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
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
      xl={2}
    >

      <Card sx={{ maxWidth: 345 }}>
        <Typography variant="subtitle1" className="product_card_header" fontWeight="600">
          {data.name}
        </Typography>
        <CardMedia
          component="img"
          height="220"
          image={data.image_path}
          alt={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.price}
          </Typography>

        </CardContent>
        <CardActions className="product_card_buttons_container">
          <Link to={`/products/${data._id}`} style={{ textDecoration: 'none' }}>
            <Button size="medium" variant="contained" disableElevation>Detail</Button>
          </Link>

          <Button
            size="medium"
            variant="contained"
            color="error"
            disableElevation
            onClick={() => { addProductToCart(data._id); dispatch(addProduct({ productId: data._id, quantity: 1, price: data.price, name: data.name })); }}
          >Add to Cart
          </Button>
        </CardActions>
      </Card>

    </Grid>
  );
}

export default Product;
