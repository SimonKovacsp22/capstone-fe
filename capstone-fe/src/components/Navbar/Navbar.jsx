/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer, Grid } from '@mui/material';
import { Menu, LoginOutlined } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createAuthRefreshInterceptor } from 'axios-auth-refresh';
import { refreshAuthLogic } from '../../lib/axios';
import { Sidebar, AccountMenu, ShopingCartPrew, Search, ChatIndicator } from '..';
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
        const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/users/me`, {
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
  }, [isAuthenticated]);

  useEffect(() => {
    getCartForUser();
  }, [user._id]);

  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar
          sx={{ paddingLeft: { xs: '16px', sm: '32px', md: '0', lg: '0' },
            paddingRight: { xs: '16px', sm: '32px', md: '52px', lg: '52px' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent: { xs: 'space-between', md: '' },
          }}
          className="navbar_toolbar"
        >
          <Grid container display="flex" sx={{ justifyContent: { xs: 'space-between' } }}>
            <Grid item md={2} lg={4} display="flex">
              {isMedium && (
              <IconButton
                sx={{ display: { sm: 'flex', md: 'none' }, color: 'white', alignItems: 'center' }}
                onClick={() => setMobileOpen((prevState) => !prevState)}
                className="navbar_menu_button"
              >
                <Menu fontSize="medium" />
              </IconButton>
              )}

            </Grid>
            {!isMobile ? <Grid item md={5} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Search /></Grid> : null}
            <Grid item md={5} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>

              {!isMedium ? (
                <div className="navbar_contact_button">
                  <Button size="medium" endIcon={<CallIcon fontSize="medium" />} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.14)' } }}>
                    Contact
                  </Button>

                </div>
              ) : (
                <IconButton aria-label="delete" size="small" sx={{ color: 'white', padding: '8px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.14)' } }}>
                  <CallIcon fontSize="medium" />
                </IconButton>
              )}
              <ShopingCartPrew />
              <div className="navbar_avatar">
                {!isAuthenticated
                  ? (
                    !isMedium
                      ? (
                        <Button
                          color="inherit"
                          sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.14)' } }}
                          onClick={() => { navigate('/login'); }}
                        >Login &nbsp; <LoginOutlined />
                        </Button>
                      )
                      : (
                        <IconButton
                          sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.14)' } }}
                          onClick={() => { navigate('/login'); }}
                        >
                          <LoginOutlined />
                        </IconButton>
                      )
                  )

                  : (
                    <div>
                      <Button
                        color="inherit"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ padding: '3px 8px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.14)' } }}
                      >
                        <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                      </Button>
                      <AccountMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
                    </div>
                  )}
              </div>

            </Grid>
          </Grid>

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
            <Drawer
              variant="permanent"
              open
              className="navbar_drawer_perm_paper"
            >
              <Sidebar />
            </Drawer>
          )}
        </nav>
      </div>
      { isAuthenticated ? <ChatIndicator /> : null}
    </>
  );
}

export default Navbar;
