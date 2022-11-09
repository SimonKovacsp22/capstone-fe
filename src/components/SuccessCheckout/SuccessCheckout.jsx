import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography, useMediaQuery } from '@mui/material';
import './styles-successCheckout.css';
import { Link } from 'react-router-dom';

function SuccessCheckout() {
  const isLg = useMediaQuery('(min-width:1050px)');
  return (
    <div className="successCheckout_container">
      <div className="successCheckout_title_container">
        <CheckCircleIcon sx={{ height: '2rem', width: '2rem', color: '#2C9586' }} />
        <h4>Thank you, your order has been confirmed!</h4>
      </div>
      <Typography variant="subtitle1" sx={{ paddingInline: '2rem', marginBlockEnd: '1rem' }}>
        Thank you for shopping with us. We&apos;ll send a confirmation once your item has shipped,{ isLg && <br /> }if you would like to check the status of your order(s) please button below.
      </Typography>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <button type="button" className="successCheckout_button">
          Go to my orders
        </button>
      </Link>
    </div>
  );
}

export default SuccessCheckout;
