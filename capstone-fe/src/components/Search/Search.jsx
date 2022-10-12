import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid } from '@mui/material';
import { setSearchTerm } from '../../lib/redux/reducers/search';
import './styles-search.css';

function Search() {
  console.log(window.location.pathname);
  const navigate = useNavigate();
  const searchTermRef = useRef();

  const dispatch = useDispatch();
  const submitSearchTerm = (event) => {
    event.preventDefault();
    if (window.location.pathname !== '/products') {
      navigate('/products');
    }

    dispatch(setSearchTerm(searchTermRef.current.value));
  };

  return (
    <Paper variant="outlined">
      <Grid container wrap="nowrap">
        <Grid item className="search_logo" xs={2}>
          Logo
        </Grid>
        <Grid item xs={10} className="search_body">
          <form action="" className="search_bar" onSubmit={submitSearchTerm}>
            <input ref={searchTermRef} type="search" name="search" pattern=".*\S.*" />
            <button className="search_btn" type="submit">
              <span>Search</span>
            </button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Search;
