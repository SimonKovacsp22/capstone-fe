import { Box, Typography, useMediaQuery } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import React from 'react';
import './styles-keywords.css';

function KeyWords() {
  const isLg = useMediaQuery('(max-width:1337px)');
  return (
    <Box display="flex" sx={{ justifyContent: { lg: 'center' }, gap: `${isLg ? '1rem' : '4rem'}`, flexDirection: { xs: 'column', lg: 'row' }, mb: '11rem' }}>
      <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: `${isLg ? '1rem' : '4rem'}`, justifyContent: 'center' }}>
        <div className="keywords_container">
          <div className="keywords_white_circle_container"><RemoveRedEyeIcon sx={{ color: 'rgb(225, 36, 52)', fontSize: '7.5rem' }} /></div>
          <Typography textAlign="center" sx={{ letterSpacing: '.125rem', color: 'rgb(225, 36, 52)', fontSize: '1.7rem', mb: '.5rem' }}>
            FOCUS
          </Typography>
          <Typography textAlign="center" sx={{ fontSize: '1.2rem' }}>
            We have a 100% commitment<br /> to making all our sites the best<br /> they
            can possibly be, no matter<br /> what it takes to get there.
          </Typography>
        </div>
        <div className="keywords_container">
          <div className="keywords_white_circle_container"><GroupsIcon sx={{ color: 'rgb(225, 36, 52)', fontSize: '7.5rem' }} /></div>
          <Typography textAlign="center" sx={{ letterSpacing: '.125rem', color: 'rgb(225, 36, 52)', fontSize: '1.7rem', mb: '.5rem' }}>
            PASSION
          </Typography>
          <Typography textAlign="center" sx={{ fontSize: '1.2rem' }}>
            Our desire to produce good<br /> work runs deep - that&apos;s what<br /> lets us handle every project<br /> with fresh energy and<br /> enthusiasm.
          </Typography>
        </div>
      </Box>
      <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: `${isLg ? '1rem' : '4rem'}`, justifyContent: 'center' }}>
        <div className="keywords_container">
          <div className="keywords_white_circle_container"><FavoriteIcon sx={{ color: 'rgb(225, 36, 52)', fontSize: '7.5rem' }} /></div>
          <Typography textAlign="center" sx={{ letterSpacing: '.125rem', color: 'rgb(225, 36, 52)', fontSize: '1.7rem', mb: '.5rem' }}>
            EMPATHY
          </Typography>
          <Typography textAlign="center" sx={{ fontSize: '1.2rem' }}>
            While we share our knowledge<br /> and experience, we listen hard<br /> to understand your business<br /> and your needs.
          </Typography>
        </div>
        <div className="keywords_container">
          <div className="keywords_white_circle_container"><HandshakeIcon sx={{ color: 'rgb(225, 36, 52)', fontSize: '7.5rem' }} /></div>
          <Typography textAlign="center" sx={{ letterSpacing: '.125rem', color: 'rgb(225, 36, 52)', fontSize: '1.7rem', mb: '.5rem' }}>
            TEAM WORK
          </Typography>
          <Typography textAlign="center" sx={{ fontSize: '1.2rem' }}>
            We are united with you in the<br /> drive to get the best from your<br /> project - think of us as extra<br /> members of your team with all<br /> the skills you need.
          </Typography>
        </div>
      </Box>

    </Box>
  );
}
export default KeyWords;
