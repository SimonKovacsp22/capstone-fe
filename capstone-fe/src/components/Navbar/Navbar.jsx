import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer, Stack } from '@mui/material';
import { Menu, LoginOutlined } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sidebar, AccountMenu, ShopingCartPrew, Search } from '..';
import { userSelector, setUser } from '../../lib/redux/reducers/auth';
import { setItems } from '../../lib/redux/reducers/cart';
import './styles-navbar.css';

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(max-width:900px)');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const accountId = localStorage.getItem('account_id');

  const navigate = useNavigate();

  const { user } = useSelector(userSelector);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAuthenticated } = useSelector(userSelector);

  const getCartForUser = async () => {
    if (user._id) {
      const token = localStorage.getItem('accessToken');
      const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        } });

      dispatch(setItems({ products: data.cart.products, quantity: data.quantity }));
    }
  };

  const getDataForUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const { data, status } = await axios.get(`${process.env.REACT_APP_BE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          } });

        if (data) {
          dispatch(setUser(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataForUser();
  }, []);

  useEffect(() => {
    getCartForUser();
  }, [user._id]);

  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar
          sx={{ marginLeft: { xs: '0', md: '225px', lg: '200px' },
            marginRight: { md: '50px', lg: '200px' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent:
         { xs: 'space-between', md: 'flex-end' } }}
          className="navbar_toolbar"
        >
          {isMedium && (
          <IconButton
            sx={{ display: { sm: 'block', md: 'none' } }}
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevState) => !prevState)}
            className="navbar_menu_button"
          >
            <Menu fontSize="medium" sx={{ paddingInline: '11px' }} />
          </IconButton>
          )}
          <Stack direction="row" alignItems="center">
            <Search />
            {!isMobile ? (
              <div className="navbar_contact_button">
                <Button size="medium" endIcon={<CallIcon fontSize="medium" />}>
                  Contact
                </Button>

              </div>
            ) : (
              <IconButton aria-label="delete" size="small">
                <CallIcon fontSize="medium" />
              </IconButton>
            )}
            <ShopingCartPrew />
            <div className="navbar_avatar">
              {!isAuthenticated ? (<Button color="inherit" onClick={() => { navigate('/login'); }}>Login &nbsp; <LoginOutlined /> </Button>) : (
                <div>
                  <Button
                    color="inherit"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                  </Button>
                  <AccountMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
                </div>
              )}
            </div>
          </Stack>

        </Toolbar>
      </AppBar>
      <div>
        <nav>
          {isMedium ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              ModalProps={{ keepMounted: true }}
              className="navbar_drawer_paper"
            >
              <Sidebar />
            </Drawer>
          ) : (
            <Drawer variant="permanent" open className="navbar_drawer_perm_paper">
              <Sidebar />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
