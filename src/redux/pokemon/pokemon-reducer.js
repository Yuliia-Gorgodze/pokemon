import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
    addFavoritePokemonSuccess,
    deleteFavoritePokemonSuccess,
} from './pokemon-actions';

const favoritePokemon = createReducer(
    [],
    {
      [addFavoritePokemonSuccess]: (state, { payload }) => [...state, payload],
      [deleteFavoritePokemonSuccess]: (state, { payload }) => {
        let deleteFavorite = state.map(el => el.id)
        if(deleteFavorite.indexOf(payload) === -1){
          return state
        }else{
           state.splice(deleteFavorite.indexOf(payload), 1)
           return  state
        }
        
      }
    },
  );

export default combineReducers({
    favoritePokemon
});
