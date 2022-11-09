import { Box, Grid, Typography, Rating, Divider, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../lib/redux/reducers/cart';
import { userSelector } from '../../lib/redux/reducers/auth';
import './styles-checkout.css';
import { sumItems } from '../ShoppingCartPrew/ShopingCartPrew';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
  const { items, quantity } = useSelector(cartSelector);
  const { user } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      const checkoutSession = await axios.post(
        `${process.env.REACT_APP_BE_URL}/checkout/create-checkout-session`,
        {
          items,
          email: user.email,
        },
      );

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result)setIsLoading(false);
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" position="relative">
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
        Cashier
      </Typography>
      <Grid container justifyContent="space-between" height="100%">
        <Grid item xs={12} lg={8} sx={{ padding: '1rem' }} className="checkoutPage_cart_item">
          <h4>
            Shopping Cart
          </h4>
          <div className="divider" style={{ backgroundColor: 'rgb(223 221 221)' }} />

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
          <div className="checkoutPage_checkout_container">
            <Typography variant="h4" style={{ marginBottom: '.9rem' }}>
              Checkout
            </Typography>
            <div className="divider" />
            <Typography variant="h6" sx={{ color: '#2E3A4F', ml: '1rem' }}>
              Subtotal ({quantity} {`${quantity > 1 ? 'items ' : 'item '}`}):
            </Typography>
            <Typography variant="h6" sx={{ color: '#2E3A4F', ml: '1rem' }}>
              {`${sumItems(items)}`}&#8364;
            </Typography>
            <button type="button" className="checkoutPage_checkout_button" onClick={() => { createCheckoutSession(); }}>
              {isLoading ? <CircularProgress size="1.5rem" disableShrink sx={{ color: '#FFF8ED' }} /> : <span>Checkout</span>}
            </button>
          </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutPage;
