// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SearchBar from './components/SearchBar';

const App = () => {
  const handleSearch = (searchTerm) => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" exact component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetail} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
