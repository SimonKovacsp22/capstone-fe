import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TreeView, TreeItem } from '@mui/lab';
import { Box, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { setCategory } from '../../lib/redux/reducers/search';
import { useGetCategoriesQuery } from '../../lib/services/kotol-be';
import './styles-sidebarTree.css';

export default function FileSystemNavigator() {
  const { data, isFetching } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  if (isFetching) {
    return (

      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>

    );
  }

  return (

    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {data.map((category) => {
        if (category.subCategories.length !== 0) {
          return (
            <TreeItem key={category._id} nodeId={category._id} label={category.name} style={{ width: 'auto' }} onClick={() => dispatch(setCategory(category._id))}>
              {category.subCategories.map((subCat) => (
                <TreeItem key={subCat._id} nodeId={subCat._id} label={subCat.name} style={{ width: 'auto' }} onClick={() => dispatch(setCategory(subCat._id))} />

              ))}
            </TreeItem>
          );
        }
      })}
    </TreeView>
  );
}
