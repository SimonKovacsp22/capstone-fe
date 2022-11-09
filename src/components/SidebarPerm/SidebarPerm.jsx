import React from 'react';
import { Divider, List, ListSubheader } from '@mui/material';
import { SidebarTree } from '..';

function SidebarPerm() {
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

export default SidebarPerm;
