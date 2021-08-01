import React, { useEffect } from 'react';
import Card from '../components/PokemonCard';
import selectors from '../redux/pokemon/pokemon-selectors';
import operations from '../redux/pokemon/pokemon-operations';
import { useSelector, useDispatch } from 'react-redux';
import page from '../redux/page/pageOperations';
import style from './styles/galleryPage.module.css';
import { Row, Col } from 'antd';

function FavoritePage() {
  const favoritePokemon = useSelector(selectors.getFavoritePokemon);
  const dispatch = useDispatch();
  useEffect(() => {
    async function addFavoritPokemon() {
      const parseFavoritePokemon = JSON.parse(
        await localStorage.getItem('favoritePokemon'),
      );
      const parsePage = JSON.parse(await localStorage.getItem('page'));
      dispatch(page(parsePage));
      if (parseFavoritePokemon !== 0) {
        dispatch(
          operations.addPokemonInLocaStorage(
            parseFavoritePokemon,
            favoritePokemon,
          ),
        );
      }
    }
    addFavoritPokemon();
  }, []);

  return (
    <>
      {favoritePokemon.length !== 0 || (
        <div>
          <span className={style.text}>Ты нас не любишь?</span>
          <span className={style.textTwo}>Полюби!!!</span>
        </div>
      )}
      <Row className={`${style.pokemonContainer}`}>
        {favoritePokemon.map(pokemon => (
          <Col key={pokemon.name} className={style.card}>
            <Card key={pokemon.name} pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default FavoritePage;
