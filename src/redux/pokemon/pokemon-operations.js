import {
    addFavoritePokemonError,
    addFavoritePokemonRequest,
    addFavoritePokemonSuccess,
    deleteFavoritePokemonRequest,
    deleteFavoritePokemonSuccess,
    deleteFavoritePokemonError,
} from './pokemon-actions';


  const addFavoritePokemon = (pokemon) =>
  async dispatch => {
    dispatch(addFavoritePokemonRequest());
    try {
      dispatch(addFavoritePokemonSuccess(pokemon));
    } catch (error) {
      dispatch(addFavoritePokemonError(error));
    console.log('Упал');
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

const operations = { addFavoritePokemon, deleteFavoritePokemon}
export default operations 
