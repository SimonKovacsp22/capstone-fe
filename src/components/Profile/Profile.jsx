import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Box, Typography, useMediaQuery } from '@mui/material';
import MyOrder from './MyOrder/MyOrder';
import { userSelector } from '../../lib/redux/reducers/auth';
import { getOrdersForUser } from '../../lib/axios';
import './styles-profile.css';
import Favorites from './Favorites/Favorites';

function Profile() {
  const { user } = useSelector(userSelector);
  const [orders, setOrders] = useState([]);

  const isMd = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    const googleAccessToken = localStorage.getItem('googleAccessToken');
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getOrdersForUser(accessToken).then((data) => setOrders(data));
    }
    if (googleAccessToken) { getOrdersForUser(googleAccessToken).then((data) => setOrders(data)); }
  }, []);
  return (
    <div className="profile_page">
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white', textAlign: `${isMd && 'center'}` }}>
        Account
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: `${isMd ? 'center' : 'space-between'}`, flexWrap: 'wrap', rowGap: '2rem', columnGap: '2rem' }}>
        <List
          className="profile_orders_list"
          style={{ padding: '1rem', paddingBottom: `${orders?.length === 0 && '2rem'}` }}
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader" sx={{ backgroundColor: 'transparent', fontSize: '1.5rem', color: '#2E3A4F', fontWeight: '600' }}>
              My orders
              <div className="divider" style={{ backgroundColor: 'rgb(223 221 221)', marginTop: '.5rem', marginInline: '0', marginBottom: '1rem' }} />
            </ListSubheader>
      )}>
          {orders?.length > 0 ? orders.map((order) => (
            <MyOrder order={order} />
          )) : (
            <Typography ml="2rem">
              You haven&apos;t ordered yet.
            </Typography>
          )}
        </List>
        <Favorites favorites={user.favorites} />
      </Box>
    </div>
  );
}

export default Profile;
