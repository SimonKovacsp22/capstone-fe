import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer } from '@mui/material';
import { Menu, LoginOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Sidebar } from '..'; import { userSelector, setUser } from '../../lib/redux/reducers/auth';

import './styles-navbar.css';

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  // const isMedium = useMediaQuery('(max-width:900px)');

  const token = localStorage.getItem('accessToken');

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(userSelector);
  const getDataForUser = async () => {
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
  }, [token]);

  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar sx={{ marginLeft: { xs: '0', md: '50px', lg: '200px' }, marginRight: { md: '50px', lg: '200px' }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }} className="navbar_toolbar">
          {isMobile && (
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
              <Button color="inherit" onClick={() => { navigate('/profile'); }}>
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              </Button>
            )}
          </div>

        </Toolbar>
      </AppBar>
      <div>
        <nav>
          {isMobile && (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              ModalProps={{ keepMounted: true }}
              className="navbar_drawer_paper"
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
