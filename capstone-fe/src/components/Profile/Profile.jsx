import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../lib/redux/reducers/auth';
import './styles-profile.css';

function Profile() {
  return (
    <div className="profile_page" />
  );
}

export default Profile;
