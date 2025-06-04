import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onReset }) => {
  const [searchInput, setSearchInput] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear any existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 1000); // 1 secondset

    setDebounceTimeout(timeout);
  };

  const handleReset = () => {
    setSearchInput('');
    onReset();
  };

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchInput}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button onClick={handleReset} style={styles.resetButton}>Reset</button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    gap: '1rem',
  },
  input: {
    width: '250px',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  resetButton: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#b74555',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default SearchBar;
