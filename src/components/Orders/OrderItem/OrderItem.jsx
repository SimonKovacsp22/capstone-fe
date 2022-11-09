import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Box } from '@mui/system';
import format from 'date-fns/format';
import { changeOrderStatus } from '../../../lib/axios';

function OrderItem({ order, refetch }) {
  const [open, setOpen] = useState(false);

  function formatDate(date) {
    const dateToString = date.slice(0, 10).replaceAll('-', '/');
    return dateToString;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleStatusChange = (status) => {
    const token = localStorage.getItem('accessToken');
    const orderResolved = status !== 'Resolved';

    changeOrderStatus(order._id, orderResolved, token);
    refetch();
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
        <Box sx={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}>
          <Typography sx={{ minWidth: '220px' }}>
            {order._id}
          </Typography>
          <Typography sx={{ minWidth: '240px' }}>
            {order.guest || order.user?.email}
          </Typography>
          <Typography sx={{ minWidth: '65px' }}>
            {order.amount.toLocaleString('en-US')}&#8364;
          </Typography>
          <Typography>
            {formatDate(order.createdAt)}
          </Typography>
          <Typography

            sx={{ color: `${order.status === 'Resolved' ? 'green' : 'red'}`, minWidth: '80px', marginInlineEnd: '1rem', '&:hover': { cursor: 'pointer' } }}
          >
            {order.status}
          </Typography>
        </Box>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon />
            <ListItemText />
            <Box sx={{ display: 'flex', gap: '2rem' }}>
              {order.products.map((prod) => (
                <Box key={prod._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <img src={prod.image_path} alt={prod.name} width={100} height={100} className="orders_product_image" />
                  <Typography sx={{ color: 'rgb(132, 144, 149)' }}>
                    quantity: 1
                  </Typography>
                  <Typography sx={{ color: 'rgb(132, 144, 149)' }}>
                    code:{` ${` ${prod.code}`}`}
                  </Typography>
                </Box>
              ))}
            </Box>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}

export default OrderItem;
