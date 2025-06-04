import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
import SearchBar from './SearchBar';

const PokemonList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [filteredPokeData, setFilteredPokeData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);


  const pokeFun = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      getPokemon(res.data.results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Pokémon data. Please check your internet connection.');
      setLoading(false);
    }
  };

  const getPokemon = async (res) => {
    const promises = res.map((item) => axios.get(item.url).then((res) => res.data));

    Promise.all(promises)
      .then((pokemonData) => {
        setPokeData((prevData) => {
          const newData = pokemonData.filter(
            (poke) => !prevData.some((prev) => prev.id === poke.id)
          );
          return [...prevData, ...newData];
        });

      })
      .catch(() => {
        setError('Error fetching Pokémon details.');
      });
  };


  useEffect(() => {

    pokeFun();

  }, []);

  const handleReset = () => {
    // Clear the filtered list
    setFilteredPokeData([]);
    setIsSearching(false);
  };

  const handleSearch = (searchTerm) => {
    setIsSearching(true);
    const filteredPokemon = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokeData(filteredPokemon);
  };

  const fetchMoreData = async () => {
    if (nextUrl) {
      try {
        const res = await axios.get(nextUrl);
        setNextUrl(res.data.next);
        getPokemon(res.data.results);
      } catch (err) {
        setHasMore(false);
        setError('Error loading more Pokémon.');
      }
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      {error && <div className="error">{error}</div>}
      {isSearching ? (
        <div className="container">
          <div className="left-content">
            {filteredPokeData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                No Pokémon found for that search.
              </div>
            ) : (
              <Card pokemon={filteredPokeData} loading={false} />
            )}
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={pokeData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>🎉 No more Pokémon to load!</p>}
        >
          <div className="container">
            <div className="left-content">
              <Card pokemon={pokeData} loading={loading} />
            </div>
          </div>
        </InfiniteScroll>
      )}

    </>
  );
};

export default PokemonList;

