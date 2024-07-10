import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type=text
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder=상품명 검색...
      />
      <button type=submit>검색</button>
    </form>
  );
}

export default SearchBar;

