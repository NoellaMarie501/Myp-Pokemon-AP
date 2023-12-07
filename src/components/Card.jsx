import React from "react";
import { Link } from "react-router-dom";
const Card = ({ pokemon, loading}) => {
    //console.log("pokedmon", pokemon);
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => (
                    <Link to={`/pokemon/${item.id}`} key={item.id} state={{ pokemon: item }}>
                      <div className="card">
                        <h2>{item.id}</h2>
                        <img src={item.sprites.front_default} alt="" />
                        <h2>{item.name}</h2>
                      </div>
                    </Link>
                  ))
        }

        </>
    )
}
export default Card;