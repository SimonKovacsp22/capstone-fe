import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Login, Profile, PasswordReset, ProductsPage, Home } from '.';
import ProductDetail from './ProductsPage/Products/Product/ProductDetail/ProductDetail';
import Register from './Register/Register';
import './index.css';

function App() {
  return (
    <div className="root">
      <Navbar />
      <main className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
