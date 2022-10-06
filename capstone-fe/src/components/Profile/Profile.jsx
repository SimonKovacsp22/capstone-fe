import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setUserLogout, userSelector } from '../../lib/redux/reducers/auth';
import './styles-profile.css';

function Profile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(userSelector);
  return (
    <div className="profile_page">
      <Button onClick={() => { localStorage.clear(); dispatch(setUserLogout()); navigate('/'); }}>
        Logout &nbsp;
        <LogoutOutlined />
      </Button>
    </div>
  );
}

export default Profile;
