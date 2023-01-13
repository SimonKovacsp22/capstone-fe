import { Typography, useMediaQuery } from '@mui/material';
import './styles-home.css';
import { Box } from '@mui/system';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Footer from './Footer/Footer';
import Carousel from './Carousel/Carousel';
import ProductsPrew from './ProductsPrew/ProductsPrew';
import Tapestry from './Tapestry/Tapestry';

function Home() {
  const isXs = useMediaQuery('(max-width:600px)');
  return (
    <div className="home_container">
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: '1rem', marginBlockEnd: '1rem', color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
        Home
      </Typography>
      <div className="home_carousel_and_prodPrew_container">

        <Tapestry />
        {isXs && (
        <Box display="flex" sx={{ width: '100%', paddingInline: { xs: 0, sm: '2rem' }, flexDirection: 'column', gap: '1rem' }}>
          <Box
            display="flex"
            sx={{ alignItems: 'center',
              gap: '1rem',
              paddingInline: '2rem',
              paddingBlock: '1rem',
              background: 'white',
              boxShadow: '0 10px 20px -10px rgb(0 0 0 / 10%)',
            }}
          >
            <CurrencyExchangeIcon sx={{ width: '3rem', height: '3rem', color: '#2E3A4F' }} />
            <Typography sx={{
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2E3A4F',
              letterSpacing: '0.1',
              lineHeight: '1.2' }}
            >
              Money back guarantee
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{ alignItems: 'center',
              gap: '1rem',
              paddingInline: '2rem',
              paddingBlock: '1rem',
              background: 'white',
              boxShadow: '0 10px 20px -10px rgb(0 0 0 / 10%)',
            }}
          >
            <LocalShippingIcon sx={{ width: '3rem', height: '3rem', color: '#2E3A4F' }} />
            <Typography sx={{
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2E3A4F',
              letterSpacing: '0.1',
              lineHeight: '1.2' }}
            >
              Free Delivery
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{ alignItems: 'center',
              gap: '1rem',
              paddingInline: '2rem',
              paddingBlock: '1rem',
              background: 'white',
              boxShadow: '0 10px 20px -10px rgb(0 0 0 / 10%)',
            }}
          >
            <SupportAgentIcon sx={{ width: '3rem', height: '3rem', color: '#2E3A4F' }} />
            <Typography sx={{
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2E3A4F',
              letterSpacing: '0.1',
              lineHeight: '1.2' }}
            >
              Help & Support
            </Typography>
          </Box>
        </Box>

        )}

        <div className="home_title_secondary">
          <Typography sx={{ fontSize: '1.7rem', fontWeight: '600', color: '#2E3A4F', mb: '2rem', mt: '7rem' }}>
            Bestsellers
          </Typography>
        </div>
        <ProductsPrew />
        <div className="home_title_secondary">
          <Typography sx={{ fontSize: '1.7rem', fontWeight: '600', color: '#2E3A4F', mb: '2rem' }}>
            Top Brands
          </Typography>
        </div>
        <Carousel />
      </div>
      <Footer />

    </div>
  );
}

export default Home;
