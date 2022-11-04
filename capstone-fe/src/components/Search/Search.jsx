import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../lib/redux/reducers/search';
import './styles-search.css';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2E3A4F" className="bi bi-search search_icon" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  );
}

function Search() {
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

    <form action="" className="search_bar" onSubmit={submitSearchTerm}>
      <input ref={searchTermRef} type="text" name="search" placeholder="Search products" />
      <button type="submit" onClick={submitSearchTerm}> <SearchIcon /></button>
    </form>

  );
}

export default Search;
