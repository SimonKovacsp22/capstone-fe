import React, { useState, useEffect } from 'react';
import { Container, Button, Avatar, TextField, FormControlLabel, Checkbox, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, userSelector } from '../../lib/redux/reducers/auth';
import { getDataForUser, loginUser } from '../../lib/axios';
import GoogleSocialButton from './GoogleLogin/GoogleLogin';

import './styles-login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const googleAccessToken = searchParams.get('accessToken');
  const googleRefreshToken = searchParams.get('refreshToken');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response) {
      setErr(response.data.message);
    }
  };

  const { isAuthenticated } = useSelector(userSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (googleAccessToken && !isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) localStorage.removeItem('accessToken');
      localStorage.setItem('googleAccessToken', googleAccessToken);
      localStorage.setItem('googleRefreshToken', googleRefreshToken);
      getDataForUser(googleAccessToken).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, [googleAccessToken]);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <Container component="main" className="loginForm_container" style={{ maxWidth: '508px' }}>
      <Box
        sx={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '3rem 2.5rem 3rem 2.5rem',
          borderRadius: '8px',

        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#2E3A4F' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!!err}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus

          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={!!err}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={err}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            className="login_button"
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            sx={{ mt: 3,
              mb: 2,
              backgroundColor: '#2E3A4F',
              '&:hover': {
                backgroundColor: 'rgba(88,110,149,1)',
                boxShadow: '1px 1px 4px 4px #C7DBFC' } }}
          >
            Sign In
          </Button>
          <GoogleSocialButton />
          <Grid container mt="2rem">
            <Grid item xs>
              <Link to="/password-reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
  );
}

export default Login;
