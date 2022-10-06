import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Login, Profile, PasswordReset } from '.';
import Register from './Register/Register';
import './index.css';

function App() {
  return (
    <div className="root">
      <Navbar />
      <main className="content">
        <Routes>
          <Route exact path="/" element={<div style={{ height: '1000px' }} />} />
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
