// src/components/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetail = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const { name } = match.params;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon detail:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [match.params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Pokemon Detail</h2>
      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    </div>
  );
};

export default PokemonDetail;
