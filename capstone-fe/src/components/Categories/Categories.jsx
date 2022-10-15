import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, Button, Avatar, useMediaQuery } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SidebarTree } from '..';

function Categories() {
  return (
    <>

      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        <SidebarTree />
      </List>
    </>
  );
}

export default Categories;
