import styles from './Team.module.css';

export default function SelectedTeam(props) {
    const { team } = props

    const getColorType = (type) => {
        switch(type) {
            case 'normal':
                return '#a8a77a'
            case 'fire':
                return '#ee8130'
            case 'water':
                return '#6390f0'
            case 'electric':
                return '#f7d02c'
            case 'grass':
                return '#7ac74c'
            case 'ice':
                return '#96d9d6'
            case 'fighting':
                return '#c22e28'
            case 'poison':
                return '#a33ea1'
            case 'ground':
                return '#e2bf65'
            default:
            case 'flying':
                return '#a98ff3'
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {
                    team && team.map(
                        pokemon => 
                        <div 
                            key= {pokemon.name} 
                            className={styles.listItem} 
                            style={{background: getColorType(pokemon.types[0])}}
                        >
                        <img src={pokemon.image} alt={pokemon.name} />
                        <h1>{pokemon.name}</h1>
                        {pokemon.savedMoves && pokemon.savedMoves.map(move => <div>{move.name}</div>) }
                        </div>
                    )
                }
            </div>
        </div>
    );
}