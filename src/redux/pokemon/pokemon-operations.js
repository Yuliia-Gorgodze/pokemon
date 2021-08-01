import {
  addFavoritePokemonError,
  addFavoritePokemonRequest,
  addFavoritePokemonSuccess,
  deleteFavoritePokemonRequest,
  deleteFavoritePokemonSuccess,
  deleteFavoritePokemonError,
  getPokemonRequest,
  getPokemonSuccess,
  getPokemonError,
  addPokemoninlocalStorage,
} from './pokemon-actions';

const addAllPokemon = pokemons => async dispatch => {
  dispatch(getPokemonRequest());
  try {
    dispatch(getPokemonSuccess(pokemons));
  } catch (error) {
    dispatch(getPokemonError(error));
  }
};

const addFavoritePokemon = (pokemon, favoritePokemon) => async dispatch => {
  dispatch(addFavoritePokemonRequest());

  try {
    if (pokemon.length > 1) {
      dispatch(addPokemoninlocalStorage(pokemon, favoritePokemon));
      return;
    }
    if (favoritePokemon.length === 0) {
      dispatch(addPokemoninlocalStorage(pokemon, favoritePokemon));
    } else {
      dispatch(addFavoritePokemonSuccess(pokemon));
    }
  } catch (error) {
    dispatch(addFavoritePokemonError(error));
  }
};
const deleteFavoritePokemon = (name, favoritePokemons) => async dispatch => {
  dispatch(deleteFavoritePokemonRequest());
  try {
    dispatch(deleteFavoritePokemonSuccess(name, favoritePokemons));
  } catch (error) {
    dispatch(deleteFavoritePokemonError(error));
  }
};

const operations = { addFavoritePokemon, deleteFavoritePokemon, addAllPokemon };
export default operations;
