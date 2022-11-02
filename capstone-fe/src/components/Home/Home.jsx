import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import './styles-home.css';
import Footer from './Footer/Footer';
import Carousel from './Carousel/Carousel';
import ProductsPrew from './ProductsPrew/ProductsPrew';

function Home() {
  const isXl = useMediaQuery('(max-width:1400px)');
  return (
    <div className="home_container">
      <ProductsPrew />
      <Carousel />
      <Footer />

    </div>
  );
}

export default Home;
