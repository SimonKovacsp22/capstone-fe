import React, { useEffect, useState } from 'react';
import './styles-orders.css';
import { useSelector } from 'react-redux';
import { List, ListItem, Pagination, Stack, Typography } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { getAllOrders } from '../../lib/axios';
import { userSelector } from '../../lib/redux/reducers/auth';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import OrderItem from './OrderItem/OrderItem';

function Orders() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noDisplayedElems, setNoDisplayedElems] = useState(8);

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };
  useEffect(() => {
    const skip = (page - 1) * noDisplayedElems;
    if (user.role === 'admin') {
      const accessToken = localStorage.getItem('accessToken');
      getAllOrders(accessToken, noDisplayedElems, skip).then((data) => {
        setTotalPages(data.totalPages);
        setOrders(data.orders);
      }).catch();
    }
  }, [isAuthenticated, page]);

  const handleRangeSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handlePaginationChange = (event, pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <div className="orders_container">
      <div className="orders_title_and_date_picker">
        <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
          Orders
        </Typography>
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date(2022, 8, 1)}
          rangeColors={['rgba(46,58,79,1)']}
          onChange={handleRangeSelect}
        />
      </div>

      <div className="orders_list_container">
        <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockStart: '2rem', marginBlockEnd: '1rem', color: '#2E3A4F' }}>
          List
        </Typography>
        <List className="orders_list">
          {orders && orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </List>
        <Stack spacing={2} sx={{ marginBlock: '2rem', alignSelf: 'center' }}>
          <Pagination count={totalPages} page={page} onChange={handlePaginationChange} />
        </Stack>
      </div>
    </div>
  );
}

export default Orders;
