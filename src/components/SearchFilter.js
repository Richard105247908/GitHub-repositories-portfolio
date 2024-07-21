import React from 'react';

const SearchFilter = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      className="search-input w-full p-2 border border-gray-300 rounded mb-4"
      placeholder="Search Repositories"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchFilter;
