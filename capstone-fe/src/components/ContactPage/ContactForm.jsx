import { SendSharp } from '@mui/icons-material';
import { Button, TextField, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function ContactForm() {
  const isXs = useMediaQuery('(max-width:450px)');
  const isSm = useMediaQuery('(max-width:768px)');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="contactForm_container"
      sx={{ backgroundColor: 'white',
        filter: 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))' }}
      style={{ borderRadius: `${isXs ? '0' : '8px'}` }}
    >

      <Box display="flex" sx={{ gap: `${isSm ? '0' : '1rem'}`, flexDirection: `${isSm ? 'column' : 'row'}` }}>
        <TextField id="standard-basic" label="Name" variant="outlined" />
        <TextField id="standard-basic" label="Email address" variant="outlined" />
      </Box>
      <TextField
        sx={{ marginBottom: '1rem' }}
        id="filled-multiline-flexible"
        label="Your question"
        multiline
        rows={3}
        variant="outlined"
      />
      <Button variant="contained" startIcon={<SendSharp />} sx={{ alignSelf: 'flex-end', backgroundColor: '#2E3A4F', '&:hover': { backgroundColor: '#526587' } }}>
        Send
      </Button>
    </Box>
  );
}

export default ContactForm;
