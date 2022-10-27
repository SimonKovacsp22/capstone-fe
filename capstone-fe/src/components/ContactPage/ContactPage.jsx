import { Typography, Box, useMediaQuery } from '@mui/material';
import React from 'react';
import Map from './Map';
import './styles-contact.css';

function ContactPage() {
  const isSm = useMediaQuery('(max-width:670px)');
  return (
    <Box className="contactPage-container" sx={{ width: { xs: '100%', md: 'auto' } }}>
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" textAlign="start" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white', alignSelf: { xs: 'center', md: 'self-start' } }}>
        Contact
      </Typography>
      <Box display="flex" sx={{ flexDirection: { lg: 'row', xs: 'column' }, backgroundColor: '#FFF8ED ', filter: 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))', padding: '1rem', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: `${isSm ? 'column' : 'row'}` }}>
          <div style={{ margin: `${isSm ? '2rem 0' : '2rem 3rem 2rem 2rem  '}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="http://www.najlacnejsikotol.sk/logo-gamaja-small.png" alt="gamaja-heizung" />
          </div>
          <div style={{ marginBlock: '1rem', marginInline: `${isSm ? 'auto' : '0'}` }}>
            <Typography variant="h5" marginBottom="1rem" color="#2E3A4F">
              GAMAJA Heizung s.r.o.
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }} fontWeight="600" color="#2E3A4F">Address</Typography>
            <Typography variant="subtitle1" fontWeight="300" lineHeight={1.2} color="#9ab1bb">
              Golianovo 403
            </Typography>
            <Typography variant="subtitle1" marginBottom="1rem" fontWeight="300" lineHeight={1.2} color="#9ab1bb">
              Postal code: 951 08
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }} color="#2E3A4F" fontWeight="600">
              Bank account
            </Typography>
            <Typography variant="subtitle1" fontWeight="300" lineHeight={1.2} color="#9ab1bb">
              IBAN SK52 0900 0000 0051 7036 7078
            </Typography>
            <Typography varaint="subtitle1" marginBottom="1rem" color="#9ab1bb" fontWeight="300" lineHeight={1.2}>
              Slovenská sporiteľňa, a.s.
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }} color="#2E3A4F" fontWeight="600">
              E-mail:
            </Typography>
            <Typography variant="subtitle1" marginBottom="1rem" fontWeight="300" lineHeight={1.2} color="#9ab1bb">
              info@gamaja.sk
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }} color="#2E3A4F" fontWeight="600">
              Phone
            </Typography>
            <Typography variant="subtitle1" fontWeight="300" lineHeight={1.2} color="#9ab1bb">
              +421 910 389 351
            </Typography>
          </div>
        </Box>
        <Map />
      </Box>

    </Box>
  );
}

export default ContactPage;
