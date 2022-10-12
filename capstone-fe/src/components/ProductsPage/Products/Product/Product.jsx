import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, CardHeader } from '@mui/material';

function Product({ data }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <Link to={`/products/${data._id}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={data.name} />
          <CardMedia
            component="img"
            height="140"
            image={data.image_path}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Link>

    </Grid>
  );
}

export default Product;
