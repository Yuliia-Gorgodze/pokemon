  
import React from 'react';
import Card from '../components/PokemonCard';
import selectors from '../redux/pokemon/pokemon-selectors'
import { useSelector} from 'react-redux'
import style from './styles/galleryPage.module.css'

function FavoritePage() {

 const favoritePokemon = useSelector(selectors.getFavoritePokemon)

  return (
      <div>
            {favoritePokemon.length !== 0 || <div>
                <span className={style.text}>Ты нас не любишь?</span>
                <span className={style.textTwo}>Полюби!!!</span>
                </div>}
            <div className={`${style.pokemonContainer} `}>
              {favoritePokemon.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
      </div>
 
  );
}

export default FavoritePage;
