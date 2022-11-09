import React, { useRef, useState } from 'react';
import './styles-orders.css';
import { useSelector } from 'react-redux';
import { Box, Button, List, Pagination, Stack, Typography, Switch } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import { userSelector } from '../../lib/redux/reducers/auth';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import OrderItem from './OrderItem/OrderItem';
import { useGetOrdersBySearchQuery } from '../../lib/services/orders-be';

function Orders() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState({ startDate: '', endDate: '', email: '' });
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState('0');
  const [limit, setLimit] = useState('10');
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedDateRange, setCheckedDateRange] = useState(false);

  const emailRef = useRef();

  const { data, isFetching, refetch } = useGetOrdersBySearchQuery({ email: searchInput.email, skip, limit, startDate: searchInput.startDate, endDate: searchInput.endDate });

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };
  const handleChangeEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  const handleChangeDateRange = (event) => {
    setCheckedDateRange(event.target.checked);
  };

  const handleRangeSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handlePaginationChange = (event, pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    setSearchInput({
      email: `${checkedEmail ? emailRef.current.value : ''}`,
      startDate: `${checkedDateRange ? format(startDate, 'yyyy/MM/dd') : ''}`,
      endDate: `${checkedDateRange ? format(endDate, 'yyyy/MM/dd') : ''}`,
    });
  };
  return (
    <div className="orders_container">
      {/* setsearchInput({ startDate: format(ranges.selection.startDate, 'yyyy/MM/dd'), endDate: format(ranges.selection.endDate, 'yyyy/MM/dd') }); */}
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
          <Box className="orders_controls_container">

            <div className="orders_controls" style={{ display: 'flex' }}>
              <input
                ref={emailRef}
                style={{ borderColor: `${checkedEmail ? 'black' : 'transparent'}` }}
                className="orders_email_input"
                placeholder="Email"
              />
              <Switch
                checked={checkedEmail}
                onChange={handleChangeEmail}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <div className="orders_controls" style={{ display: 'flex' }}>
              <input
                readOnly
                style={{ borderColor: `${checkedDateRange ? 'black' : 'transparent'}` }}
                className="date_range_input"
                value={`from  ${` ${format(startDate, 'yyyy/MM/dd')} `} to ${` ${format(endDate, 'yyyy/MM/dd')}`}`}
              />
              <Switch
                checked={checkedDateRange}
                onChange={handleChangeDateRange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <Button
              onClick={handleSearch}
              sx={{ paddingBlock: '10px', color: '#1d2429' }}
            >Search
            </Button>

          </Box>
          {isFetching ? <Typography>loading...</Typography> : data.orders.map((order) => (
            <OrderItem key={order._id} order={order} refetch={refetch} />
          )) }
        </List>
        <Stack spacing={2} sx={{ marginBlock: '2rem', alignSelf: 'center' }}>
          <Pagination count={data?.totalPages} page={page} onChange={handlePaginationChange} />
        </Stack>
      </div>
    </div>
  );
}

export default Orders;
