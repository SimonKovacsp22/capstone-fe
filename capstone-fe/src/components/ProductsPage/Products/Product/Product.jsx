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
          <Typography variant="h6" className="product_card_header" fontWeight="600">
            {data.name}
          </Typography>
          <CardMedia
            component="img"
            height="220"
            image={data.image_path}
            alt={data.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.price}
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
