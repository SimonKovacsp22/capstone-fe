import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { useGetProductByIdQuery } from '../../../../../lib/services/kotol-be';
import Options from './Tabs/Tabs';
import { userSelector, setUserFavorites } from '../../../../../lib/redux/reducers/auth';
import { addProductToFavorites } from '../../../../../lib/axios';

function ProductDetail() {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const { isFetching, data } = useGetProductByIdQuery({ productId: id });
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(userSelector);

  const isXl = useMediaQuery('(min-width:1386px)');
  const isLg = useMediaQuery('(max-width:1200px)');

  const checkIfIsFavorite = () => {
    if (!isFetching) {
      if (isAuthenticated) {
        const isFavorite = user.favorites.findIndex((product) => product._id === data._id);
        if (isFavorite !== -1) setFavorite(true);
        else setFavorite(false);
      }
    }
  };

  const handleHeartClick = async () => {
    try {
      if (isAuthenticated) {
        await addProductToFavorites(data._id);
        dispatch(setUserFavorites({ product: data }));
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

            <Box sx={{ overflow: 'hidden' }} className="productDetail_img_container" style={{ display: `${isLg ? 'none' : 'block'}` }}>
              <img src={data.image_path} alt={data.name} className={isXl ? 'productDetail_img_xl' : 'productDetail_img_md'} />
            </Box>

            <Box className="productDetail_information">
              <Typography variant="h4" fontSize="2rem" fontWeight="400" sx={{ margin: '1rem', textAlign: { xs: 'center', lg: 'left' } }}>
                {data.name}
              </Typography>
              <div className="divider" />
              <div className={isXl ? 'productDetail_subtitles' : 'productDetail_subtitles_lg'}>
                <div>
                  <Typography variant="h6">
                    <span style={{ fontWeight: '300' }}>Manufacturer:</span>&nbsp; {data.madeBy}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: '300' }}>Product code:</span>&nbsp; {data.code}
                  </Typography>
                  <Typography variant="h6" mb="1rem">
                    <span style={{ fontWeight: '300' }}> Availability:</span> &nbsp;   {data.availability}
                  </Typography>
                </div>
                <div>
                  <Typography fontSize="2.5rem" mb={isXl && '1rem'} lineHeight={!isXl && '2.6rem'}>
                    {data.price.toLocaleString('en-Us')}&#8364;
                  </Typography>
                  <Typography variant="h6" mb={isXl && '1rem'}>
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
              </div>
            </Box>
          </div>
          <Options description={data.description} />
          {isLg && (
          <div className="productDetail_img_lg_container">
            <img src={data.image_path} alt={data.name} className="productDetail_img_lg" />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
