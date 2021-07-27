import React, { useEffect } from 'react';
import Card from '../components/PokemonCard';
import selectors from '../redux/pokemon/pokemon-selectors';
import operations from '../redux/pokemon/pokemon-operations';
import { useSelector, useDispatch } from 'react-redux';
import style from './styles/galleryPage.module.css';

function FavoritePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function addFavoritPokemon() {
      const parseFavoritePokemon = JSON.parse(
        await localStorage.getItem('favoritePokemon'),
      );
      if (parseFavoritePokemon) {
        parseFavoritePokemon.forEach(el =>
          dispatch(operations.addFavoritePokemon(el)),
        );
      }
    }
    addFavoritPokemon();
  }, []);

  const favoritePokemon = useSelector(selectors.getFavoritePokemon);

  return (
    <>
      {favoritePokemon.length !== 0 || (
        <div>
          <span className={style.text}>Ты нас не любишь?</span>
          <span className={style.textTwo}>Полюби!!!</span>
        </div>
      )}
      <div className={`${style.pokemonContainer} `}>
        {favoritePokemon.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

export default FavoritePage;
