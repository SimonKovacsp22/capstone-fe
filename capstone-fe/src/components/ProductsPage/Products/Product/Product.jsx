import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { addProductToCart, addProductToFavorites } from '../../../../lib/axios';
import { addProduct } from '../../../../lib/redux/reducers/cart';
import { setUserFavorites, userSelector } from '../../../../lib/redux/reducers/auth';

function Product({ data }) {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);

  const formatPrice = (price) => {
    const fixedPrice = price.toFixed(2);
    const formatedPrice = fixedPrice.toLocaleString('en-Us');

    return formatedPrice;
  };

  const checkIfIsFavorite = () => {
    if (isAuthenticated) {
      const isFavorite = user.favorites.findIndex((productId) => productId === data._id);
      if (isFavorite !== -1) setFavorite(true);
      else setFavorite(false);
    }
  };

  const handleHeartClick = async () => {
    try {
      if (isAuthenticated) {
        await addProductToFavorites(data._id);
        dispatch(setUserFavorites({ productId: data._id }));
        setFavorite((prevFavorite) => !prevFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfIsFavorite();
  }, []);

  return (
    <Grid
      item
      xs={10}
      sm={6}
      md={4}
      lg={4}
      xl={3}
    >

      <Card sx={{ maxWidth: 345, padding: '1rem', marginInline: 'auto' }}>
        <div className="product_header_favorites">

          { isAuthenticated ? (
            <Typography variant="body2" sx={{ color: '#de4854' }}>
              {favorite ? <FavoriteIcon onClick={handleHeartClick} sx={{ '&:hover': { cursor: 'pointer' } }} /> : <FavoriteBorderIcon onClick={handleHeartClick} sx={{ '&:hover': { cursor: 'pointer' } }} />}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: '#de4854' }}>
              <Tooltip title="Please login to interact!"><FavoriteBorderIcon /></Tooltip>
            </Typography>
          )}

        </div>
        <Link to={`/products/${data._id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            height="220"
            image={data.image_path}
            alt={data.name}
          />
        </Link>
        <CardContent sx={{ paddingLeft: '0', display: 'flex', flexDirection: 'column', padding: 0 }} style={{ paddingBottom: 0 }}>
          <Link to={`/products/${data._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant="subtitle2" textAlign="start" mb=".5rem" fontSize="1rem" ml="4px" className="product_title">
              {data.name}
            </Typography>
          </Link>
          <Rating name="read-only" value={data.rating || 5} readOnly />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockStart: '1rem', flexWrap: 'wrap' }}>
            <Typography gutterBottom variant="subtitle2" textAlign="start" mb={0} ml="4px" mr="1rem">
              {formatPrice(data.price)}&#8364;
            </Typography>
            <button
              type="button"
              className="product_addToCart_button"
              onClick={() => { addProductToCart(data._id); dispatch(addProduct({ data, quantity: 1 })); }}
            ><ShoppingCartIcon />Add to Cart
            </button>
          </div>

        </CardContent>

      </Card>

    </Grid>
  );
}

export default Product;
