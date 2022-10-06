import React, { useState } from 'react';
import { Button, Container, Box, Typography, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { sendResetPin } from '../../lib/axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const text = await sendResetPin(email);

    setMessage(text.message);
  };

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
        <Typography component="h1" variant="h5">
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
      </Box>

    </Container>
  );
}

export default PasswordReset;
