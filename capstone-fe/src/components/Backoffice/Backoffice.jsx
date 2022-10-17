/* eslint-disable no-bitwise */
import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box, InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { SendSharp } from '@mui/icons-material';
import { useGetCategoriesQuery } from '../../lib/services/kotol-be';
import { createProduct } from '../../lib/axios';

const sampleProduct = {
  name: '',
  description: '',
  categories: [],
  price: 0,
  madeBy: '',
  code: '',
  availability: '',

};

function Backoffice() {
  const [form, setForm] = useState(sampleProduct);
  const [image, setImage] = useState({});
  const { data, isFetching } = useGetCategoriesQuery();

  const addCategory = (categoryId) => {
    // setCategories((prevCategories) => [...prevCategories, categoryId]);
    setForm((prevForm) => ({ ...prevForm, categories: [...prevForm.categories, categoryId] }));
  };

  const removeCategory = (categoryId) => {
    setForm((prevForm) => {
      const newCategories = prevForm.categories.filter((cat) => cat !== categoryId);

      return { ...prevForm, categories: newCategories };
    });
  };

  return (
    <Container
      sx={{ marginLeft: { xs: '0', lg: '200px' },
        marginRight: { lg: '200px' },
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        marginTop: { xs: '51px' },
        display: 'flex',
        justifyContent: { xs: 'center' },
      }}
    >

      <Box sx={{ width: '600px' }}>

        <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
        <Box mt={2} sx={{ display: 'flex' }}>
          <TextField id="outlined-basic" fullWidth label="Manufacturer" variant="outlined" onChange={(e) => setForm({ ...form, madeBy: e.target.value })} value={form.madeBy} />
          <TextField id="outlined-basic" type="number" fullWidth label="Price" variant="outlined" onChange={(e) => setForm({ ...form, price: e.target.value })} value={form.price} />

        </Box>
        <Box mt={2} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ width: '50%', minWidth: '200px' }}>
            <InputLabel id="demo-simple-select-label">Available</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Available"
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
            >
              <MenuItem value="storage">Storage</MenuItem>
              <MenuItem value="order">Order</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            fullWidth
            label="Code"
            variant="outlined"
            sx={{ width: '50%', minWidth: '200px' }}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            value={form.code}

          />

        </Box>
        <Box mt={2}>
          <Typography variant="h6">
            Categories
          </Typography>

          {isFetching ? <div /> : data.map((category) => (
            <FormControlLabel
              key={category._id}
              label={category.name}
              control={(
                <Checkbox
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={(event) => {
                    if (event.target.checked) {
                      addCategory(category._id);
                    } else {
                      removeCategory(category._id);
                    }
                  }}
                />
)}
            />
          ))}

        </Box>
        <Box mt={2} display="flex" flexDirection="column">
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            value={form.description}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<ImageIcon />}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          <Button
            sx={{ marginTop: '1rem' }}
            variant="outlined"
            startIcon={<SendSharp />}
            onClick={() => {
              createProduct(form, image);
              setForm(sampleProduct);
              setImage({});
            }}
          >Send
          </Button>
        </Box>
      </Box>

    </Container>
  );
}

export default Backoffice;
