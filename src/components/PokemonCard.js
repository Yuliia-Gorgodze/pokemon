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

  const pokemonId = pokemon.url.split('/').filter(Boolean).pop();

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
      const a = addNewPokemonInLS.findIndex(el => el.name === pokemon.name);
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
    if (favoritePokemon.find(el => el.name === pokemon.name)) {
      await dispatch(operations.deleteFavoritePokemon(pokemon.name));
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
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt="pokemon"
      />
      <button
        className={`${style.button} ${
          favoritePokemon.map(el => el.name).find(el => el === pokemon.name) ===
          undefined
            ? ''
            : 'buttonAddFavorite'
        }`}
        onClick={handleChange}
        type="button"
      >
        {page === 'gallery' &&
        favoritePokemon
          .map(el => el.name)
          .find(el => el.name === pokemon.name) === undefined ? (
          <HeartTwoTone className={style.favorite} />
        ) : (
          <DeleteTwoTone className={style.delete} />
        )}
      </button>
    </div>
  );
}

export default Card;
