import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer } from '@mui/material';
import { Menu, LoginOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createAuthRefreshInterceptor } from 'axios-auth-refresh';
import { refreshAuthLogic } from '../../lib/axios';
import { Search, Sidebar, AccountMenu } from '..';
import { userSelector, setUser } from '../../lib/redux/reducers/auth';

import './styles-navbar.css';

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(max-width:900px)');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, isAuthenticated } = useSelector(userSelector);
  const getDataForUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        } });

      dispatch(setUser(data));
    }
  };

  useEffect(() => {
    getDataForUser();
  }, []);

  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar sx={{ marginLeft: { xs: '0', md: '225px', lg: '200px' }, marginRight: { md: '50px', lg: '200px' }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }} className="navbar_toolbar">
          {isMedium && (
          <IconButton
            sx={{ display: { sm: 'block', md: 'none' } }}
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevState) => !prevState)}
            className="navbar_menu_button"
          >
            <Menu />
          </IconButton>
          )}
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
                <AccountMenu handleClose={handleClose} open={open} anchorEl={anchorEl} />
              </div>
            )}
          </div>

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
              <Sidebar setMobileOpen={setMobileOpen} styles={null} />
            </Drawer>
          ) : (
            <Drawer variant="permanent" open className="navbar_drawer_perm_paper">
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
