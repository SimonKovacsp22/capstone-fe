import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './styles-home.css';
import Footer from './Footer/Footer';
import Carousel from './Carousel/Carousel';
import ProductsPrew from './ProductsPrew/ProductsPrew';
import Benefits from './Benefits/Benefits';
import Tapestry from './Tapestry/Tapestry';

function Home() {
  const isXl = useMediaQuery('(max-width:1400px)');
  return (
    <div className="home_container">
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: '1rem', marginBlockEnd: '1rem', color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
        Home
      </Typography>
      <div className="home_carousel_and_prodPrew_container">

        <Tapestry />

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
