import { useMediaQuery } from '@mui/material';
import React from 'react';
import Benefits from '../Benefits/Benefits';
import './styles-tapestry.css';

function Tapestry() {
  const isXs = useMediaQuery('(max-width:600px)');
  return (
    <div className="tapestry_container">
      {!isXs && <Benefits />}
      <div style={{ display: 'flex' }}>
        <h1 className="tapestry_title" style={{ display: `${isXs ? 'none' : 'block'}` }}>Heating Products</h1>
        <div className="tapestry_vertical_background_1" />
        <div className="tapestry_vertical_background_2" />
      </div>
    </div>
  );
}

export default Tapestry;
