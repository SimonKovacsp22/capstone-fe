import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useMediaQuery } from '@mui/material';
import atack from '../../../assets/images/fococlipping_removed-fococlipping-standard.png';
import brotje from '../../../assets/images/logo_broetje-fococlipping-HD.png';

function Carousel() {
  const isXl = useMediaQuery('(max-width:1420px)');
  const isLg = useMediaQuery('(max-width:1000px)');
  const isSm = useMediaQuery('(max-width:700px)');
  return (
    <OwlCarousel
      items={`${isXl ? `${isLg ? `${isSm ? 1 : 2}` : 3}` : 4}`}
      loop
      autoplay
      autoplayTimeout={2000}
      autoplaySpeed={500}
    >
      <div className="item">
        <img className="home_carousel_image" style={{ marginTop: '38px' }} src="https://www.immergas.com/image/company_logo?img_id=10662&t=1664714745860" />

      </div>
      <div className="item">
        <img className="home_carousel_image" style={{ marginTop: '29px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Buderus-logo.svg/1280px-Buderus-logo.svg.png" />

      </div>
      <div className="item">
        <img className="home_carousel_image" src={atack} />

      </div>
      <div className="item">
        <img className="home_carousel_image" src="https://www.viessmann.sk/content/dam/vi-brands/DE/Logo/viessmann-logo.png/_jcr_content/renditions/original./viessmann-logo.png" />

      </div>
      <div className="item">
        <img style={{ marginTop: '25px', width: '200px' }} src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Ariston_logo.jpg" />

      </div>
      <div className="item">
        <img className="home_carousel_image" src={brotje} />

      </div>

    </OwlCarousel>
  );
}

export default Carousel;
