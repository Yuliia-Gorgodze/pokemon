import { createAction } from '@reduxjs/toolkit';

export const deleteFavoritePokemonRequest = createAction(
  'pokemon/deleteFavoritePokemonRequest',
);

export const deleteFavoritePokemonSuccess = createAction(
  'pokemon/deleteFavoritePokemonSuccess',
  (payload, state) => {
    let deleteFavorite = state.map(el => el.name);
    if (deleteFavorite.indexOf(payload) === -1) {
      return { payload: state };
    } else {
      const filterPokemons = state.filter(el => el.name !== payload);
      return { payload: filterPokemons };
    }
  },
);

export const deleteFavoritePokemonError = createAction(
  'pokemon/deleteFavoritePokemonError',
);

export const addFavoritePokemonRequest = createAction(
  'pokemon/addFavoritePokemonRequest',
);
export const addFavoritePokemonSuccess = createAction(
  'pokemon/addFavoritePokemonSuccess',
);
export const addPokemoninlocalStorage = createAction(
  'pokemon/addPokemoninlocalStorageSuccess',
  (payload, state) => {
    const stateName = state.length !== 0 ? state.map(el => el.name) : [];
    const pokemon = payload.filter(el => !stateName.includes(el.name));
    return { payload: [...state, ...pokemon] };
  },
);

export const addFavoritePokemonError = createAction(
  'pokemon/addFavoritePokemonError',
);

export const getPokemonRequest = createAction('pokemon/getPokemonRequest');
export const getPokemonSuccess = createAction('pokemon/getPokemonSuccess');
export const getPokemonError = createAction('pokemon/getPokemonError');
