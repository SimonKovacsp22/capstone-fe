import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { ListItemIcon, Typography } from '@mui/material';
import { Box } from '@mui/system';

function MyOrder({ order }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  function formatDate(date) {
    const dateToString = date.slice(0, 10).replaceAll('-', '/');
    return dateToString;
  }
  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ flexGrow: '0' }}>
        <ListItemIcon>
          <MoveToInboxIcon />
        </ListItemIcon>

        <Box sx={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}>
          <Typography sx={{ width: '220px' }}>
            {order._id}
          </Typography>

          <Typography sx={{ minWidth: '65px' }}>
            {order.amount.toLocaleString('en-US')}&#8364;
          </Typography>
          <Typography>
            {formatDate(order.createdAt)}
          </Typography>
          <Typography sx={{ color: `${order.status === 'Resolved' ? 'green' : 'red'}`, width: '100px', marginInlineEnd: '1rem' }}>
            {order.status}
          </Typography>
        </Box>

        {open ? <ExpandLess sx={{ marginLeft: 'auto' }} /> : <ExpandMore sx={{ marginLeft: 'auto' }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', rowGap: '1rem' }}>
              {order.products.map((prod) => (
                <Box key={prod._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                  <img src={prod.image_path} alt={prod.name} width={100} height={100} className="orders_product_image" />
                  <Typography sx={{ color: 'rgb(132, 144, 149)' }}>
                    quantity: 1
                  </Typography>
                  <Typography sx={{ color: 'rgb(132, 144, 149)' }}>
                    price:{` ${` ${prod.price.toLocaleString('en-US')}`}`}&#8364;
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

export default MyOrder;
