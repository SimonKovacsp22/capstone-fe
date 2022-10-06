import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, Button, Avatar, useMediaQuery } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './styles-sidebar.css';

function Sidebar() {
  return (
    <>

      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
      </List>
    </>
  );
}

export default Sidebar;
