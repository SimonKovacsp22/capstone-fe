/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Container, Box, Typography, Grid, TextField, Alert, InputAdornment, OutlinedInput, IconButton, InputLabel, FormControl, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { sendResetPin, resetPassword } from '../../lib/axios';

function PasswordReset() {
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    pin: '',
    password: '',
    passwordRepeat: '',
    email: '',
    showPassword: false,
    showPasswordRepeat: false,
  });

  const code = window.location.search;
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordRepeat = () => {
    setValues({
      ...values,
      showPasswordRepeat: !values.showPasswordRepeat,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await sendResetPin(values.email);

      setMessage(response.message);
      setOpen(true);

      if (response.status === 200) {
        navigate('/password-reset?code=200');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await resetPassword(values.email, values.pin, values.password);

      if (response.status === 200) {
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="loginForm_container">
      <Box
        sx={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '3rem 1.5rem 3rem 1.5rem',
          borderRadius: '8px',

        }}
      > {message && (
        <>
          <Alert severity="success" sx={{ marginBottom: '1rem' }}>{message}</Alert>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              Please do not refresh this page!
            </Alert>
          </Snackbar>
        </>
      ) }
        {
        !message && code && (<Alert severity="error" sx={{ marginBottom: '1rem' }}>You likely refreshed the page. Go back and repeat the process!</Alert>
        )
      }
        { !code && (
        <>
          <Typography component="h1" variant="h5">
            Type in your email.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange('email')}
              value={values.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              className="login_button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,
                mb: 2,
                backgroundColor: '#2E3A4F',
                '&:hover': {
                  backgroundColor: 'rgba(88,110,149,1)',
                  boxShadow: '1px 1px 4px 4px #C7DBFC' } }}
            >
              Reset Password
            </Button>
            <Grid container mt="1rem">
              <Grid item>
                <Link to="/register" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
        )}
        { code === '?code=200'
        && (
        <>
          <Typography component="h1" variant="h5">
            Type in your pin.
          </Typography>
          <Box component="form" onSubmit={handlePasswordResetSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange('pin')}
              value={values.pin}
              margin="normal"
              required
              fullWidth
              id="pin"
              label="PIN"
              name="pin"
              autoFocus
              sx={{ marginBottom: '1rem' }}
            />
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                required
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              )}
                label="Password"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="outlined-adornment-password-repeat">Repeat Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-repeat"
                type={values.showPasswordRepeat ? 'text' : 'password'}
                value={values.passwordRepeat}
                onChange={handleChange('passwordRepeat')}
                required
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordRepeat}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              )}
                label="Repeat Password"
              />
            </FormControl>

            <Button
              className="login_button"
              style={{ backgroundColor: 'grey' }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>

          </Box>
        </>
        )}
      </Box>

    </Container>
  );
}

export default PasswordReset;
