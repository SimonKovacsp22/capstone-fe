import { useState } from 'react';
import { SendSharp } from '@mui/icons-material';
import { Alert, Button, TextField, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import emailjs from '@emailjs/browser';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [open, setOpen] = useState(false);

  const isXs = useMediaQuery('(max-width:450px)');
  const isSm = useMediaQuery('(max-width:768px)');
  const alertBP = useMediaQuery('(max-width:600px)');

  const templateParams = {
    name,
    email,
    question,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 3 && email.length > 7 && question.length > 5) {
      emailjs.send('service_k2t6nle', 'template_zgcwyle', templateParams, 'Rn-N0KN5tGps5JePe')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setOpen(true);
          setQuestion('');
        }, (err) => {
          console.log('FAILED...', err);
        });
    } else window.alert('To send a message please fill in the necessary fields!');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contactForm_container"
      style={{ borderRadius: `${isXs ? '0' : '8px'}`, filter: 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))', backgroundColor: 'white' }}
    >

      <Box display="flex" sx={{ gap: `${isSm ? '0' : '1rem'}`, mb: '1rem', flexDirection: `${isSm ? 'column' : 'row'}` }}>
        <TextField id="standard-basic" label="Name" variant="outlined" onChange={(e) => { setName(e.target.value); }} value={name} />
        <TextField id="standard-basic" label="Email address" variant="outlined" onChange={(e) => { setEmail(e.target.value); }} value={email} />
      </Box>
      <TextField
        sx={{ marginBottom: '1rem' }}
        id="filled-multiline-flexible"
        label="Your question"
        multiline
        rows={3}
        variant="outlined"
        onChange={(e) => { setQuestion(e.target.value); }}
        value={question}
      />
      <Button type="submit" variant="contained" startIcon={<SendSharp />} sx={{ alignSelf: 'flex-end', backgroundColor: '#2E3A4F', '&:hover': { backgroundColor: '#526587' } }}>
        Send
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '56px', bottom: '85px' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: `${alertBP ? 'unset' : '100%'}` }}>
          {alertBP ? 'Send!' : 'You have successfully send your message!'}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default ContactForm;
