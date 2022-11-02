import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Carousel() {
  return (
    <OwlCarousel
      items={6}
      loop
      margin={32}
      nav
      autoplayTimeout={2000}
      autoplaySpeed={500}
      style={{ width: '1300px', margin: '0 auto' }}
    >
      <div className="item">
        <img className="home_carousel_image" style={{ marginTop: '35px' }} src="https://www.immergas.com/image/company_logo?img_id=10662&t=1664714745860" />

      </div>
      <div className="item">
        <img className="home_carousel_image" style={{ marginTop: '25px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Buderus-logo.svg/1280px-Buderus-logo.svg.png" />

      </div>
      <div className="item">
        <img className="home_carousel_image" src="../../../assets/images/fococlipping_removed-fococlipping-standard.png" />

      </div>
      <div className="item">
        <img className="home_carousel_image" src="https://www.viessmann.sk/content/dam/vi-brands/DE/Logo/viessmann-logo.png/_jcr_content/renditions/original./viessmann-logo.png" />

      </div>
      <div className="item">
        <img className="home_carousel_image" src="../../../assets/images/logo_broetje-fococlipping-HD.png" />

      </div>
      <div className="item">
        <img width={170} src="https://1000logos.net/wp-content/uploads/2022/06/Ariston-logo.png" />

      </div>
    </OwlCarousel>
  );
}

export default Carousel;
