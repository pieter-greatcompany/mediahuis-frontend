
import React, {useState} from 'react'
import { useQuery } from 'graphql-hooks';

import styles from './PokemonList.module.css';

const LIST_QUERY = `query {
    Pokemons(first: 151) {
      id
      name
    }
  }
  `

export default function PokemonDetail(props) {
    
    const [filter, setFilter] = useState('');
    const { loading, error, data } = useQuery(LIST_QUERY)
    
    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'
    
    const filteredData = data.Pokemons.filter(pokemon => pokemon.name.includes(filter))

    return (
        <div className={styles.root}>
            <input 
                className={styles.filterInput} 
                type="text" 
                name="listFilter" 
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className={styles.list}>
                {
                    filteredData && filteredData.map(
                        item => 
                        <div 
                            key= {item.name} 
                            className={styles.listItem} 
                            onClick={() => props.onPokemonSelected(item)}
                        >
                            {item.name}
                        </div>
                    )
                }
            </div>
        </div>
    );
}