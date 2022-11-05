import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { Link } from 'react-router-dom';

function Favorites({ favorites }) {
  console.log(favorites);
  return (
    <div className="profile_favorites_container">
      <Box display="flex" alignItems="center" gap="1rem">
        <Typography sx={{ fontSize: '1.5rem', color: '#2E3A4F', fontWeight: '600', lineHeight: '48px', paddingLeft: '1rem' }}>
          Favorite products
        </Typography>
        <FavoriteIcon sx={{ width: '2rem', height: '2rem', color: '#de4854' }} />
      </Box>
      <div className="divider" style={{ marginBottom: '-1rem', marginTop: '.5rem', marginInline: '0' }} />
      <div>
        { favorites && favorites.map((prod) => (
          <Box sx={{ dislay: 'flex', flexDirection: 'column' }}>
            <Link to={`/products/${prod._id}`} style={{ textDecoration: 'none' }}>
              <img src={prod.image_path} alt={prod.name} width={300} height={300} className="profile_favorites_img" />
              <Typography sx={{ color: '#2E3A4F', marginTop: '-3rem', textAlign: 'center' }}>
                {prod.name}
              </Typography>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
