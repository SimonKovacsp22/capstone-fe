import React from 'react';
import { IconButton, Menu, MenuItem, Typography, Divider, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../lib/redux/reducers/cart';
import './styles-shoppingCartPrew.css';

function ShopingCartPrew() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const cartItems = useSelector(cartSelector);

  const sumItems = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.productId.price * item.quantity;
    });

    return sum;
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
          badgeContent={4}
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
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {cartItems?.length > 0 ? cartItems?.map((item) => (
          <MenuItem key={item._id}>
            <Typography>
              {item.productId.name}
            </Typography>
          </MenuItem>
        )) : (
          <Typography>
            There is nothing here.
          </Typography>
        )}
        <Divider />
        <div className="shoppingCartPrew_footer">
          <div>
            <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
              Wiew Cart
            </Button>
            <Typography variant="h6">
              {`Sum total:     ${sumItems(cartItems).toFixed(2)} $`}
            </Typography>
          </div>
          <Divider />
          <div>
            <Button variant="contained" disableElevation startIcon={<AttachMoneyIcon />}>
              Begin Checkout
            </Button>
          </div>
        </div>

      </Menu>

    </div>
  );
}

export default ShopingCartPrew;
