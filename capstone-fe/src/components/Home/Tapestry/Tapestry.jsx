import React from 'react';
import Benefits from '../Benefits/Benefits';
import './styles-tapestry.css';

function Tapestry() {
  return (
    <div className="tapestry_container">
      <Benefits />
      <div style={{ display: 'flex' }}>
        <h1 className="tapestry_title">Heating Products and Services</h1>
        <div className="tapestry_vertical_background_1" />
        <div className="tapestry_vertical_background_2" />
      </div>
    </div>
  );
}

export default Tapestry;
