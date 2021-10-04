
import React, { useState } from 'react'
import { useQuery } from 'graphql-hooks';

import styles from './PokemonDetail.module.css';

const LIST_QUERY = `query Detail($name: String!) {
    Pokemon(name: $name) {
        id
        name
        image
        abilities {
          name
        }
        stats {
          name
          value
        }
        types {
          name
        }
      }
  }
  `

export default function PokemonDetail(props) {
    const [selectedMoves, setSelectedMoves] = useState([]);
    const { loading, error, data } = useQuery(LIST_QUERY, {
        variables: {
          name: props.pokemon.name
        }
      })
    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'
    
    const pokemon = data.Pokemon;

    const addNewMove = (ability) => {
      if(selectedMoves.length === 3) return;
      const updatedMoves = [
        ...selectedMoves,
        ability
      ];
      setSelectedMoves(updatedMoves);
    }

    const removeMove = (ability) => {
      const updatedMoves = selectedMoves.filter((item) => item.name !== ability.name);
      setSelectedMoves(updatedMoves);
    }

    const savePokemon = () => {
      const customPokemon = {
        ...pokemon,
        savedMoves: selectedMoves
      }
      props.onSavePokemon(customPokemon)
      setSelectedMoves([])
    }

    return (
        <div className={styles.root}>
            <div className={styles.general}>
              <img src={pokemon.image} alt={pokemon.name} />
              <h1>{pokemon.name}</h1>
              <button onClick={savePokemon} >Save Pokemon</button>
            </div>

            <div>
              <div>
                <h2>Stats</h2>
                <dl className={styles.statList}>
                {pokemon.stats.map(stat => 
                  <div key={stat.name} className={styles.statColumn}>
                    <dt>{stat.name}</dt>
                    <dd> {stat.value}</dd>
                  </div>
                )}
                </dl>  
              </div>
              <div>
                <h2>Selected moves</h2>
                <div className={styles.moveItems}>
                {selectedMoves.map(ability => 
                  <div className={styles.moveItem} onClick={() => removeMove(ability)}>
                    <h3>LEVEL-UP</h3>
                    <p>{ability.name}</p>
                  </div>
                )}
                </div>  
              </div>
            </div>
            <div>
              <h2>Tutor Machine</h2>
              {pokemon.abilities.map(ability => 
                <div className={styles.tutorItem} onClick={() => addNewMove(ability)}>
                  {ability.name}
                </div>
              )}
            </div>
        </div>
    );
}