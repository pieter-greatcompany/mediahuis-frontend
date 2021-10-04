import React, {useState} from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Container from './Container';
import Logo from './Logo';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

import styles from './App.module.css';
import SelectedTeam from './components/SelectedTeam';

const client = new GraphQLClient({
  url: process.env.REACT_APP_POKE_ENDPOINT,
});

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);
  const [team, setTeam] = useState([]);

  const updateTeam = (pokemon) => {
    if(team.length < 6) setTeam([...team, pokemon]);
    console.log("tean", pokemon)
  }

  return (
    <ClientContext.Provider value={client}>
      <>
        <Container>
          <Logo />
          <div className={styles.top}>
            <PokemonList onPokemonSelected={ (pokemon) => setSelectedPokemon(pokemon)}/>
            {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} onSavePokemon={updateTeam} />}
          </div>
          <SelectedTeam team={team} />
        </Container>
      </>
    </ClientContext.Provider>
  );
}
