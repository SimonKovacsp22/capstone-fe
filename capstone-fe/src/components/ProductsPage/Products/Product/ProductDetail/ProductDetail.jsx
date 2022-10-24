import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { useGetProductByIdQuery } from '../../../../../lib/services/kotol-be';
import Options from './Tabs/Tabs';
import { userSelector, setUserFavorites } from '../../../../../lib/redux/reducers/auth';
import { addProductToCart, addProductToFavorites } from '../../../../../lib/axios';

function ProductDetail() {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const { isFetching, data } = useGetProductByIdQuery({ productId: id });
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(userSelector);

  const checkIfIsFavorite = () => {
    if (!isFetching) {
      if (isAuthenticated) {
        const isFavorite = user.favorites.findIndex((productId) => productId === data._id);
        if (isFavorite !== -1) setFavorite(true);
        else setFavorite(false);
      }
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
  }, [data]);

  if (isFetching) {
    return (
      <div />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="productDetail_content">
        <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
          Product Detail
        </Typography>
        <div className="productDetail_img_and_information">
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Box sx={{ height: '450px', overflow: 'hidden' }} className="productDetail_img_container">
              <img src={data.image_path} alt={data.name} className="productDetail_img_xl" />
            </Box>
            <Box className="productDetail_information">
              <Typography variant="h4" fontSize="2rem" fontWeight="400" sx={{ margin: '1rem' }}>
                {data.name}
              </Typography>
              <div className="divider" />
              <div className="productDetail_subtitles">
                <Typography variant="h6">
                  <span style={{ fontWeight: '300' }}>Manufacturer:</span>&nbsp; {data.madeBy}
                </Typography>
                <Typography variant="h6">
                  <span style={{ fontWeight: '300' }}>Product code:</span>&nbsp; {data.code}
                </Typography>
                <Typography variant="h6" mb="1rem">
                  <span style={{ fontWeight: '300' }}> Availability:</span> &nbsp;   {data.availability}
                </Typography>
                <Typography fontSize="2.5rem" mb="1rem">
                  {data.price.toLocaleString('en-Us')}&#8364;
                </Typography>
                <Typography variant="h6" mb="1rem">
                  <span style={{ fontWeight: '300' }}>Tax free:</span>&nbsp; {(data.price - data.price * 0.2).toLocaleString('en-Us')}&#8364;
                </Typography>
                { isAuthenticated ? (
                  <Typography variant="body2" sx={{ color: '#de4854' }}>
                    {favorite ? (
                      <FavoriteIcon
                        onClick={handleHeartClick}
                        sx={{ '&:hover': { cursor: 'pointer' }, width: '3rem', height: '3rem' }}
                      />
                    ) : <FavoriteBorderIcon onClick={handleHeartClick} sx={{ '&:hover': { cursor: 'pointer' }, width: '3rem', height: '3rem' }} />}
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: '#de4854' }}>
                    <Tooltip title="Please login to interact!"><FavoriteBorderIcon sx={{
                      width: '3rem', height: '3rem' }}
                    />
                    </Tooltip>
                  </Typography>
                )}
              </div>
            </Box>
          </div>
          <Options description={data.description} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
