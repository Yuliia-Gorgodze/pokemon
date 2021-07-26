import {
    addFavoritePokemonError,
    addFavoritePokemonRequest,
    addFavoritePokemonSuccess,
    deleteFavoritePokemonRequest,
    deleteFavoritePokemonSuccess,
    deleteFavoritePokemonError,
    getPokemonRequest,
     getPokemonSuccess,
      getPokemonError
} from './pokemon-actions';

   const addAllPokemon = (pokemons) => 
    async dispatch => {
      dispatch(getPokemonRequest())
      try {
        dispatch(getPokemonSuccess(pokemons));
      } catch (error) {
        dispatch(getPokemonError(error));

      }
    }
   

  const addFavoritePokemon = (pokemon) =>
  async dispatch => {
    dispatch(addFavoritePokemonRequest());
    try {
      dispatch(addFavoritePokemonSuccess(pokemon));
    } catch (error) {
      dispatch(addFavoritePokemonError(error));

    }
  };
  const deleteFavoritePokemon = (id) =>
  async dispatch => {
    dispatch(deleteFavoritePokemonRequest());
    try {
      dispatch(deleteFavoritePokemonSuccess(id));
    } catch (error) {
      dispatch(deleteFavoritePokemonError(error));
    console.log('Упал');
    }
  };

const operations = { addFavoritePokemon, deleteFavoritePokemon, addAllPokemon}
export default operations 
