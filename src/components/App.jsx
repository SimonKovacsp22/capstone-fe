import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Login, Profile, PasswordReset, ProductsPage, Home, Backoffice, CheckoutPage, SuccessCheckout, Management, Orders, ContactPage, AboutUs, PageNotFound, LandingPage } from '.';
import ProductDetail from './ProductsPage/Products/Product/ProductDetail/ProductDetail';
import Register from './Register/Register';
import { userSelector } from '../lib/redux/reducers/auth';
import './index.css';

function App() {
  const isLg = useMediaQuery('(min-width:900px)');
  const isXs = useMediaQuery('(max-width:450px)');
  const { user } = useSelector(userSelector);
  return (
    <div className="root">
      <Navbar />
      <main className={`${isLg ? 'content_lg' : 'content'} `} style={isXs ? { padding: '80px 0px 0px 0px' } : {}}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />
          {user && user.role === 'admin'
          && (
          <>
            <Route exact path="/backoffice/new-product" element={<Backoffice />} />
            <Route exact path="/backoffice/management" element={<Management />} />
            <Route exact path="/backoffice/orders" element={<Orders />} />

          </>
          )}
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/success" element={<SuccessCheckout />} />
          <Route exact path="/contact-page" element={<ContactPage />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
