import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TreeView, TreeItem, Skeleton } from '@mui/lab';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { searchTermSelector, setCategory, setSearchTerm } from '../../lib/redux/reducers/search';
import { useGetCategoriesQuery } from '../../lib/services/kotol-be';
import './styles-sidebarTree.css';
import { userSelector } from '../../lib/redux/reducers/auth';

export default function FileSystemNavigator() {
  const { data, isFetching } = useGetCategoriesQuery();
  const skeleton = [1, 0.7, 0.7, 1, 0.7];

  const dispatch = useDispatch();

  const findProductsInCategory = (categoryId) => {
    if (userSelector(searchTermSelector) !== '') {
      dispatch(setSearchTerm(''));
    }
    dispatch(setCategory(categoryId));
  };

  if (isFetching) {
    return (

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {skeleton.map((item, i) => (
          <Skeleton key={i} width={(item * 100).toString().concat('%')} style={item === 1 ? { marginTop: '.5rem' } : { marginRight: '1rem' }} />
        ))}
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
            <TreeItem key={category._id} nodeId={category._id} label={category.name} style={{ width: 'auto' }} onClick={() => findProductsInCategory(category._id)}>
              {category.subCategories.map((subCat) => (
                <TreeItem key={subCat._id} nodeId={subCat._id} label={subCat.name} style={{ width: 'auto' }} onClick={() => findProductsInCategory(subCat._id)} />

              ))}
            </TreeItem>
          );
        }
      })}
    </TreeView>
  );
}
