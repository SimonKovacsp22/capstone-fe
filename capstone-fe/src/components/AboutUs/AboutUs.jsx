import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import './styles-aboutUs.css';
import KeyWords from './Keywords/KeyWords';
import Team from './Team/Team';

function AboutUs() {
  return (
    <div className="aboutUs-container">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', marginBottom: { xs: '5rem', sm: '11rem' } }}>
        <div className="aboutUs-banner-left-container">
          <Typography className="aboutUs-logo" sx={{ display: { xs: 'none', lg: 'block' }, lineHeight: { xs: '1.3' } }}>
            G
          </Typography>
        </div>
        <div className="aboutUs-banner-right-container">
          <Typography sx={{ fontSize: { xs: '10rem', sm: '15rem' }, lineHeight: { xs: '.7' } }}>
            HIGH
          </Typography>
          <Typography sx={{ fontSize: { xs: '5.625rem', sm: '8.125rem' }, lineHeight: { xs: '1.5', lg: '1.3' }, letterSpacing: { xs: '0.07538em' } }}>
            VALUES
          </Typography>
          <Typography variant="h6" textAlign="center" fontWeight="400" sx={{ fontSize: { xs: '.85rem', sm: '1.25rem' } }}>
            Our success is not only due to the quality of our work<br /> it&apos;s down to attitude, our approach and the way we<br /> treat our clients.
          </Typography>
        </div>
      </Box>

      <KeyWords />
      <Team />

    </div>
  );
}

export default AboutUs;
