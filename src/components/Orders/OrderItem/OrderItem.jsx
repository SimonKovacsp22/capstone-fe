import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { Box } from '@mui/system';
import { changeOrderStatus } from '../../../lib/axios';

function OrderItem({ order }) {
  const [open, setOpen] = useState(false);
  const [resolved, setResolved] = useState(order.status === 'Resolved');

  function formatDate(date) {
    const dateToString = date.slice(0, 10).replaceAll('-', '/');
    return dateToString;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleStatusChange = (status) => {
    const token = localStorage.getItem('accessToken');

    changeOrderStatus(order._id, status, token);
    console.log(order._id);
    setResolved((prevState) => (!prevState));
  };
  return (
    <>
      <ListItemButton sx={{ paddingLeft: '10px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '1.2rem', minWidth: '125px' }}>
            <Typography
              sx={{ color: `${resolved ? 'green' : 'red'}`, minWidth: '80px', marginInlineEnd: '1rem', '&:hover': { cursor: 'pointer' } }}
            >
              {resolved ? 'Resolved' : 'Unresolved'}
            </Typography>

            {resolved ? <ClearIcon onClick={() => handleStatusChange(false)} /> : <CheckIcon onClick={() => handleStatusChange(true)} />}

          </div>
        </Box>
        {open ? <ExpandLess onClick={handleClick} sx={{ width: '2em' }} /> : <ExpandMore onClick={handleClick} sx={{ width: '2em' }} />}

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
