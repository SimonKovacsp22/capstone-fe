import React from 'react';
import './styles-benefits.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

function Benefits() {
  const isBr = useMediaQuery('(min-width:1266px)');
  const isLg = useMediaQuery('(max-width:1100px)');
  const isSm = useMediaQuery('(max-width:800px)');
  return (
    <div className="home_benefits_container">
      <div className="benefits_single_benefit_container">
        <Box display="flex" sx={{ alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <LocalShippingIcon sx={{ width: { sm: '2rem', md: '2.5rem', lg: '3rem' }, height: { sm: '2rem', md: '2.5rem', lg: '3rem' }, color: '#2E3A4F' }} />
          <Typography sx={{ textTransform: 'uppercase', fontSize: { md: '1.5rem', lg: '1.8rem' }, fontWeight: '600', color: '#2E3A4F', letterSpacing: '0.1', lineHeight: `${isLg ? '1.2' : '1.5'}` }}>
            Free<br style={{ display: `${!isBr ? 'block' : 'none'}` }} /> Delivery
          </Typography>
        </Box>
        <Typography sx={{ marginTop: { xs: '1rem' }, textAlign: 'center', fontSize: { lg: '1rem' }, color: '#7e7e7e' }}>
          With purchase over 1000&#8364;<br style={{ display: `${isBr ? 'block' : 'none'}` }} /> we guarantee free delivery
        </Typography>
      </div>
      <div className="benefits_border_container benefits_single_benefit_container">
        <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box display="flex" sx={{ alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <CurrencyExchangeIcon sx={{ width: { sm: '2rem', md: '2.5rem', lg: '3rem' }, height: { sm: '2rem', md: '2.5rem', lg: '3rem' }, color: '#2E3A4F' }} />
            <Typography sx={{ display: `${isSm ? 'flex' : 'block'}`,
              textTransform: 'uppercase',
              fontSize: { md: '1.5rem', lg: '1.8rem' },
              fontWeight: '600',
              color: '#2E3A4F',
              letterSpacing: '0.1',
              lineHeight: `${isLg ? '1.2' : '1.5'}` }}
            >
              Money back<span style={{ display: `${isSm ? 'block' : 'none'}` }}>guarantee</span><br style={{ display: `${isBr || !isSm ? 'block' : 'none'}` }} />
            </Typography>
          </Box>
          <Typography sx={{ display: `${isSm ? 'none' : 'block'}`, textTransform: 'uppercase', fontSize: { md: '1.5rem', lg: '1.8rem' }, fontWeight: '600', color: '#2E3A4F', letterSpacing: '0.1', lineHeight: '1.2' }}>
            guarantee
          </Typography>
        </Box>
        <Typography sx={{ marginTop: { xs: '1rem' }, textAlign: 'center', fontSize: { lg: '1rem' }, color: '#7e7e7e' }}>
          If you are not happy about the purchase<br style={{ display: `${isBr ? 'block' : 'none'}` }} /> we will return the full cost within 30 days
        </Typography>
      </div>
      <div className="benefits_border_container benefits_single_benefit_container">
        <Box display="flex" sx={{ alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <SupportAgentIcon sx={{ width: { sm: '2rem', md: '2.5rem', lg: '3rem' }, height: { sm: '2rem', md: '2.5rem', lg: '3rem' }, color: '#2E3A4F' }} />
          <Typography sx={{ textTransform: 'uppercase', fontSize: { md: '1.5rem', lg: '1.8rem' }, fontWeight: '600', color: '#2E3A4F', letterSpacing: '0.1', lineHeight: `${isLg ? '1.2' : '1.5'}` }}>
            Help & support
          </Typography>
        </Box>
        <Typography sx={{ marginTop: { xs: '1rem' }, textAlign: 'center', fontSize: { lg: '1rem' }, color: '#7e7e7e' }}>
          Do you need help?<br style={{ display: `${isBr ? 'block' : 'none'}` }} /> Chat with us during working hours.
        </Typography>
      </div>
    </div>
  );
}

export default Benefits;
