import React from "react";
import Card from "./Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
const PokemonList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [filteredPokeData, setFilteredPokeData] = useState([]);

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  const handleSearch = (searchTerm) => {
    const filteredPokemon = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokeData(filteredPokemon);
  };

  return (
    <>
    <SearchBar onSearch={handleSearch} />{" "}
      <div className="container"> 
      
        <div className="left-content">
         
          {/* Pass handleSearch as onSearch prop */}
          <Card
            pokemon={filteredPokeData.length > 0 ? filteredPokeData : pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonList;
