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
    dispatch(addFavoritePokemonSuccess(pokemon));
  } catch (error) {
    dispatch(addFavoritePokemonError(error));
  }
};
const addPokemonInLocaStorage =
  (pokemon, favoritePokemon) => async dispatch => {
    try {
      dispatch(addPokemoninlocalStorage(pokemon, favoritePokemon));
    } catch (error) {
      console.log(error);
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

const operations = {
  addFavoritePokemon,
  deleteFavoritePokemon,
  addAllPokemon,
  addPokemonInLocaStorage,
};
export default operations;
