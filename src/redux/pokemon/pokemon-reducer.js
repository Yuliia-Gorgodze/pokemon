import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  addFavoritePokemonSuccess,
  deleteFavoritePokemonSuccess,
  getPokemonSuccess,
  addPokemoninlocalStorage,
} from './pokemon-actions';
const allPokemon = createReducer([], {
  [getPokemonSuccess]: (_, { payload }) => payload,
});
const favoritePokemon = createReducer([], {
  [addFavoritePokemonSuccess]: (state, { payload }) => [...state, payload],
  [addPokemoninlocalStorage]: (_, { payload }) => payload,
  [deleteFavoritePokemonSuccess]: (_, { payload }) => payload,
});

export default combineReducers({
  favoritePokemon,
  allPokemon,
});
