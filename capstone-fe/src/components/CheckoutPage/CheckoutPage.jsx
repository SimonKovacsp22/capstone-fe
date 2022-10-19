import { Box, Grid, Typography, Rating, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../lib/redux/reducers/cart';
import './styles-checkout.css';
import { sumItems } from '../ShoppingCartPrew/ShopingCartPrew';

function CheckoutPage() {
  const { items, quantity } = useSelector(cartSelector);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8} sx={{ padding: '1rem' }} className="checkoutPage_cart_item">
        <h4>
          Shopping Cart
        </h4>
        <Divider sx={{ mb: '2rem', ml: '1rem', mr: '1rem', borderColor: '#F7F9F9', borderWidth: '2px' }} />

        <Box>
          {items.length > 0 ? items.map((item) => (
            <Box key={item._id} display="flex">
              <img src={item.productId.image_path} alt={item.productId.name} width="180" height="180" className="checkout_product_image" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" sx={{ mb: '.5rem' }}>
                  {item.productId.name}
                </Typography>
                <Rating name="read-only" value={item.productId.rating || 5} readOnly />
                <p className="chechout_subtitle_clamp">
                  {item.productId.description}
                </p>
                <Typography variant="subtitle1">
                  {item.productId.price.toLocaleString('en-US')}&#8364; &#215; {item.quantity}
                </Typography>
              </Box>
            </Box>
          )) : (
            <Typography variant="h4">
              There is nothing here!
            </Typography>
          )}
        </Box>

      </Grid>
      <Grid item xs={12} lg={3} className="checkoutPage_cart_item checkoutPage_subtotal" sx={{ ml: { xs: 0, lg: '4rem' }, mt: { xs: '32px', lg: 0 } }}>
        { quantity > 0 && (
        <div>
          <Typography variant="h4" style={{ marginBottom: '.9rem' }}>
            Checkout
          </Typography>
          <Divider sx={{ mb: '1.5rem', ml: '1rem', mr: '1rem', borderColor: '#ffe9c3', borderWidth: '2px' }} />
          <Typography variant="h6" sx={{ color: '#2E3A4F', ml: '1rem' }}>
            Subtotal ({quantity} {`${quantity > 1 ? 'items ' : 'item '}`}):
          </Typography>
          <Typography variant="h6" sx={{ color: '#2E3A4F', ml: '1rem' }}>
            {`${sumItems(items)}`}&#8364;
          </Typography>
        </div>
        )}
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;
