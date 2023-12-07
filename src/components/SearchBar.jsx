// src/components/SearchBar.js
import React, { useState } from "react";
import './SearchBar.css'
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Pokemon"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
