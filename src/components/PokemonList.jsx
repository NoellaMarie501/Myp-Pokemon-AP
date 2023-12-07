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
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [filteredPokeData, setFilteredPokeData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const pokeFun = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Pokemon data. Please check your internet connection and try again.');
      setLoading(false);
    }
  };

  const getPokemon = async (res) => {
    const promises = res.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });

    Promise.all(promises)
      .then((pokemonData) => {
        setPokeData((prevData) => [...prevData, ...pokemonData]);
      })
      .catch((error) => {
        setError('Error fetching Pokemon details. Please try again.');
      });
  };

  useEffect(() => {
    if (pokeData.length === 0) {
      pokeFun();
    }
  }, [pokeData]);

  const handleSearch = (searchTerm) => {
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
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
      } catch (error) {
        setError('Error fetching more Pokemon data. Please try again.');
        setHasMore(false); // Disable infinite scroll on error
      }
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <div>Error: {error}</div>}
      <InfiniteScroll
        dataLength={pokeData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more Pokemon to load!</p>}
      >
        <div className="container">
          <div className="left-content">
            <Card
              pokemon={filteredPokeData.length > 0 ? filteredPokeData : pokeData}
              loading={loading}
             
            />
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default PokemonList;
