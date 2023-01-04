import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../lib/redux/reducers/auth';
import './styles-successCheckout.css';

function SuccessCheckout() {
  const isLg = useMediaQuery('(min-width:1050px)');

  const { isAuthenticated } = useSelector(userSelector);
  return (
    <div className="successCheckout_container">
      <div className="successCheckout_title_container">
        <CheckCircleIcon sx={{ height: '2rem', width: '2rem', color: '#2C9586' }} />
        <h4>Your order has been confirmed!</h4>
      </div>

      {isAuthenticated ? (
        <>
          <Typography variant="subtitle1" sx={{ paddingInline: '2rem', marginBlockEnd: '1rem' }}>
            Thank you for shopping with us. We&apos;ll send a confirmation once your item has shipped,{ isLg && <br /> }if you would like to check the status of your order(s) press button below.
          </Typography>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <button type="button" className="successCheckout_button">
              Go to my orders
            </button>
          </Link>
        </>
      )
        : (
          <>
            <Typography variant="subtitle1" sx={{ paddingInline: '2rem', marginBlockEnd: '1rem' }}>
              Thank you for shopping with us. We&apos;ll send a confirmation once your item has shipped.
            </Typography>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button type="button" className="successCheckout_button">
                Keep shopping
              </button>
            </Link>
          </>
        )}
    </div>
  );
}

export default SuccessCheckout;
