import React from 'react';

import style from './styles/card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import selectors from '../redux/pokemon/pokemon-selectors';
import selectorsPage from '../redux/page/pageSelectors';
import operations from '../redux/pokemon/pokemon-operations';
import { HeartTwoTone, DeleteTwoTone } from '@ant-design/icons';

function Card({ pokemon, updatePokemon }) {
  const dispatch = useDispatch();
  const page = useSelector(selectorsPage.getPage);
  const favoritePokemon = useSelector(selectors.getFavoritePokemon);
  const favoritPokemonId = favoritePokemon.map(el => el.id);
  const handleChange = e => {
    if (page === 'gallery' && e.target.nodeName === 'BUTTON') {
      e.target.classList.toggle('buttonAddFavorite');
    }
    if (e.target.nodeName === 'BUTTON') {
      addFavorite();
      addLocalStorage();
    }
    if (page === 'gallery' && e.target.nodeName === 'IMG') {
      updatePokemon(pokemon, true);
    }

    return;
  };
  const addLocalStorage = () => {
    if (localStorage.getItem('favoritePokemon')) {
      const addNewPokemonInLS = JSON.parse(
        localStorage.getItem('favoritePokemon'),
      );
      const a = addNewPokemonInLS.findIndex(el => el.id === pokemon.id);
      if (a !== -1) {
        addNewPokemonInLS.splice(a, 1);
      } else {
        addNewPokemonInLS.push(pokemon);
      }

      localStorage.setItem(
        'favoritePokemon',
        JSON.stringify(addNewPokemonInLS),
      );
    }
    if (!localStorage.getItem('favoritePokemon')) {
      localStorage.setItem('favoritePokemon', JSON.stringify([pokemon]));
    }
  };
  const addFavorite = async () => {
    if (favoritPokemonId.includes(pokemon.id)) {
      await dispatch(operations.deleteFavoritePokemon(pokemon.id));
      return;
    } else {
      await dispatch(operations.addFavoritePokemon(pokemon));
    }
  };

  return (
    <div className={`${style.baseContainer} ${style.Card}`}>
      <div className={style.Card__name}>{pokemon.name}</div>
      <img
        onClick={handleChange}
        className={style.Card__img}
        src={pokemon.sprites.front_default}
        alt="pokemon"
      />
      <button
        className={`${style.button} ${
          favoritPokemonId.find(el => el === pokemon.id) === undefined
            ? ''
            : 'buttonAddFavorite'
        }`}
        onClick={handleChange}
        type="button"
      >
        {page === 'gallery' &&
        favoritePokemon.find(el => el.id === pokemon.id) === undefined ? (
          <HeartTwoTone className={style.favorite} />
        ) : (
          <DeleteTwoTone className={style.delete} />
        )}
      </button>
    </div>
  );
}

export default Card;
