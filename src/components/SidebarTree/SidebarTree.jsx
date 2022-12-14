/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TreeView, TreeItem, Skeleton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { searchTermSelector, setCategory, setSearchTerm } from '../../lib/redux/reducers/search';
import { useGetCategoriesQuery } from '../../lib/services/kotol-be';
import './styles-sidebarTree.css';

export default function FileSystemNavigator() {
  const { data, isFetching } = useGetCategoriesQuery();

  const navigate = useNavigate();

  const searchTerm = useSelector(searchTermSelector);
  const skeleton = [1, 0.7, 0.7, 1, 0.7];

  const dispatch = useDispatch();

  const findProductsInCategory = (category) => {
    if (window.location.pathname !== '/products') {
      navigate('/products');
    }

    if (searchTerm !== '') {
      dispatch(setSearchTerm(''));
    }

    dispatch(setCategory(category));
  };

  if (isFetching) {
    return (

      <Box display="block">
        <Stack sx={{ padding: '1rem' }}>
          <Skeleton variant="text" sx={{ fontSize: '40px', margin: '0 1rem 1rem 1rem' }} />
          <Skeleton variant="rectangular" height="3px" sx={{ marginBottom: '1.5rem', marginInline: '1rem' }} />

          {skeleton.map((item, i) => (
            <Skeleton key={i} width={(item * 100).toString().concat('%')} style={item === 1 ? { marginTop: '0', marginBottom: '1rem' } : { marginRight: '1rem' }} />
          ))}
        </Stack>
      </Box>

    );
  }

  return (

    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, maxWidth: 400, color: '#2E3A4F', overflow: { md: 'hidden', lg: 'visible' } }}
    >
      <div className="sidebarTree_container">
        <Typography variant="h4" margin="0 1rem 1rem 1rem" fontWeight="400" fontSize="2rem">
          Categories
        </Typography>
        <div className="divider"> </div>
        {data?.length > 0 && data.map((category) => {
          if (category.subCategories.length !== 0) {
            return (
              <TreeItem key={category._id} nodeId={category._id} label={category.name} style={{ width: 'auto', paddingBlockEnd: '1rem' }} onClick={() => findProductsInCategory(category)}>
                {category.subCategories.map((subCat) => (
                  <TreeItem key={subCat._id} nodeId={subCat._id} label={subCat.name} style={{ width: 'auto' }} onClick={() => findProductsInCategory(subCat)} />

                ))}
              </TreeItem>
            );
          }
        })}
      </div>
    </TreeView>

  );
}
