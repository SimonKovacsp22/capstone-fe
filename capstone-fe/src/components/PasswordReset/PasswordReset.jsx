import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, Grid, TextField } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sendResetPin } from '../../lib/axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [pin, setPin] = useState('');

  const code = window.location.search;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await sendResetPin(email);

    setMessage(response.message);

    if (response.status === 200) {
      navigate('/password-reset?code=200');
    }
  };

  const handlePinSubmit = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      > {message && (
      <Typography variant="body2">
        {message}
      </Typography>
      )}
        { !code && (
        <> <Typography component="h1" variant="h5">
          Type in your email.
        </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            <Grid container>
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
          <Box component="form" onSubmit={handlePinSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => {
                setPin(e.target.value);
              }}
              value={pin}
              margin="normal"
              required
              fullWidth
              id="pin"
              label="PIN"
              name="pin"
              autoFocus
            />

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
