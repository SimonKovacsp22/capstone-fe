import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../lib/redux/reducers/auth';
import './styles-landingPage.css';

function Home() {
  const isXs = useMediaQuery('(max-width:450px)');
  const { isAuthenticated } = useSelector(userSelector);
  return (
    <div className="landingPage_container">

      <div className="landingPage_logo_and_tapestry_container">
        <div className="landingPage_tapestry" />
        <div className="landingPage_logo_container">
          <Typography className="landingPage_logo">
            <span>G</span>amaja
          </Typography>
          <Typography sx={{ fontSize: `${isXs ? '1rem' : '1.5rem'}`, lineHeight: '1' }}>
            heizung s.r.o.
          </Typography>
          <div className="buttons_container">
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Button sx={{ textTransform: 'none',
                fontSize: `${isXs ? '1.2rem' : '1.5rem'}`,
                color: 'rgba(46,58,79,1)',
                borderRadius: '5px',
                background: ' linear-gradient(180deg, #ffe39d 30%, #ffc675 81%)',
                padding: `${isXs ? '.25rem 2rem' : '.5rem 4rem'}`,
                marginBottom: '1rem',
                '&:hover': {
                  cursor: 'pointer',
                  background: 'linear-gradient(180deg, #fdd433 30%, rgb(250, 177, 74) 81%)',
                } }}
              >
                Shop Products
              </Button>
            </Link>
            <Link to={isAuthenticated ? '/home' : '/login'} style={{ textDecoration: 'none', display: 'flex' }}>
              <Button sx={{ textTransform: 'none',
                fontSize: `${isXs ? '1.2rem' : '1.5rem'}`,
                color: 'white',
                borderRadius: '5px',
                backgroundColor: 'rgba(46,58,79,1)',
                border: '1px solid #e6b45e',
                flexGrow: '1',
                '&:hover': { cursor: 'pointer' } }}

              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;
