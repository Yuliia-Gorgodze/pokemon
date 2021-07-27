import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  addFavoritePokemonSuccess,
  deleteFavoritePokemonSuccess,
  getPokemonSuccess,
} from './pokemon-actions';
const allPokemon = createReducer([], {
  [getPokemonSuccess]: (_, { payload }) => payload,
});
const favoritePokemon = createReducer([], {
  [addFavoritePokemonSuccess]: (state, { payload }) => {
    if (typeof payload === 'object') {
      const filteredPokemon = state.filter(el => payload.id !== el.id);

      return [...filteredPokemon, payload];
    }
    if (state.length === 0) {
      return [...state, payload];
    } else {
      return state;
    }
  },
  [deleteFavoritePokemonSuccess]: (state, { payload }) => {
    let deleteFavorite = state.map(el => el.id);
    if (deleteFavorite.indexOf(payload) === -1) {
      return state;
    } else {
      state.splice(deleteFavorite.indexOf(payload), 1);
      return state;
    }
  },
});

export default combineReducers({
  favoritePokemon,
  allPokemon,
});
