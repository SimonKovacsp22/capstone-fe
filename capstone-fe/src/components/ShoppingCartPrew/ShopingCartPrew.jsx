import React from 'react';
import { IconButton, Menu, MenuItem, Box, Typography, Divider, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector, removeProduct } from '../../lib/redux/reducers/cart';
import { RemoveProductFromCart } from '../../lib/axios';

import './styles-shoppingCartPrew.css';

function ShopingCartPrew() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { items: cartItems, quantity } = useSelector(cartSelector);

  const dispatch = useDispatch();

  const sumItems = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.productId.price * item.quantity;
    });

    return sum.toLocaleString('en-US');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar_shopping_cart">
      <IconButton aria-label="cart" onClick={handleClick}>
        <Badge
          badgeContent={quantity}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}

        >
          <ShoppingCartIcon fontSize="medium" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: '#FFF8ED',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#FFF8ED',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {cartItems?.length > 0 ? cartItems?.map((item) => (
          <MenuItem key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ color: '#2E3A4F' }} variant="h6">
                {item.productId.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '300', marginLeft: '.5rem', color: '#9ab1bb' }}>
                {item.quantity} &#215; {item.productId.price.toLocaleString('en-US')}&#8364;
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-end' }}
              onClick={() => {
                dispatch(removeProduct({ productId: item.productId._id }));
                RemoveProductFromCart(item.productId._id);
              }}
            >
              &#10005;
            </Box>
          </MenuItem>
        )) : (
          <Typography variant="h6" x={{ color: '#2E3A4F', paddingLeft: '1rem', paddingRight: '1rem' }}>
            There is nothing here.
          </Typography>
        )}
        <Divider />
        <div className="shoppingCartPrew_footer">
          <div>
            <Button
              size="large"
              variant="outlined"
              startIcon={<ShoppingCartIcon fontSize="large" />}
              sx={{ color: '#2E3A4F',
                borderColor: '#2E3A4F',
                '&:hover': {
                  border: '1px solid #2E3A4F',
                  color: '#FFF8ED ',
                  backgroundColor: '#2E3A4F',
                } }}
            >
              Wiew Cart
            </Button>
            <Typography variant="h6" sx={{ color: '#2E3A4F' }}>
              {`Sum total:     ${sumItems(cartItems)}`}&#8364;
            </Typography>
          </div>
          <Divider />
          <div>
            <Button
              size="large"
              variant="contained"
              disableElevation
              startIcon={<CreditCardIcon fontSize="large" />}
              sx={{ color: '#FFF8ED ',
                borderColor: '#2E3A4F',
                backgroundColor: '#2E3A4F',
                '&:hover': {
                  backgroundColor: '#37455d' } }}
            >
              Begin Checkout
            </Button>
          </div>
        </div>

      </Menu>

    </div>
  );
}

export default ShopingCartPrew;
