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
    if (payload.length > 0) {
      const stateId = state.length !== 0 ? state.map(el => el.id) : [];
      const pokemon = payload.filter(el => !stateId.includes(el.id));
      return [...state, ...pokemon];
    }
    return state;
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
