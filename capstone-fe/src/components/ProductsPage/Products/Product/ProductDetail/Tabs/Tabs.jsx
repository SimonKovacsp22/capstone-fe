import * as React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

const Tab = styled(TabUnstyled)`
  font-family: Roboto, Helvetica;
  color: #2E3A4F;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px;
  border: none;
  display: flex;
  font-size: 1.25rem;
  justify-content: center;
  font-weight: 400;
  border-radius: 5px;
  margin-right:2px;
  





  &.${tabUnstyledClasses.selected} {
    background:  linear-gradient(180deg, rgba(88,110,149,1) 19%, rgba(46,58,79,1) 100%);
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)(
  `
    min-width: 400px;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
    margin-left: 1rem;
    `,
);

const TabPanel = styled(TabPanelUnstyled)(
  `
    width: 100%;
    max-width: 95%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 0 1rem 1rem 1.5rem;
    border-radius: 12px;
    opacity: 0.6;
    `,
);

export default function Options({ description, params, accessories }) {
  return (
    <Box className="productDetail_options">
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>Description</Tab>
          <Tab>Parameters</Tab>
          <Tab>Accessories</Tab>
        </TabsList>
        <TabPanel value={0}>{description}</TabPanel>
        <TabPanel value={1}>Parameters</TabPanel>
        <TabPanel value={2}>Accessories</TabPanel>
      </TabsUnstyled>
    </Box>
  );
}
