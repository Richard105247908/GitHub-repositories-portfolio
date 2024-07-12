import React from 'react';

const SearchFilter = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search Repositories"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchFilter;
