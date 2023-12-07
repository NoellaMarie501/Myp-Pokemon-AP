import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './PokemonDetail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setError('Error fetching Pokemon details. Please try again.');
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Link to="/">
          <button>Back to Pokemon List</button>
        </Link>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div>
        <p>Pokemon not found</p>
        <Link to="/">
          <button>Back to Pokemon List</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">
        <button>Back to Pokemon List</button>
      </Link>
      <div className="right-content">
        <h1>{pokemon.name}</h1>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt=""
        />
        <div className="abilities">
          {pokemon.abilities.map((poke) => (
            <div className="group" key={poke.ability.name}>
              <h2>{poke.ability.name}</h2>
            </div>
          ))}
        </div>
        <div className="base-stat">
          {pokemon.stats.map((poke) => (
            <h3 key={poke.stat.name}>
              {poke.stat.name}:{poke.base_stat}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
