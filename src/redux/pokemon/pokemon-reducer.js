import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
    addFavoritePokemonSuccess,
    deleteFavoritePokemonSuccess,
    getPokemonSuccess

} from './pokemon-actions';
const allPokemon = createReducer([],{
  [getPokemonSuccess]: (_, { payload }) => payload,
})
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
    favoritePokemon, allPokemon
});
