import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/PokemonCard';
import { getPokemon, getAllPokemon } from '../services/pokemon';
import style from './styles/galleryPage.module.css';
import ModalPokemonInfo from '../components/ModalPokemonInfo';
import selectors from '../redux/pokemon/pokemon-selectors';
import operations from '../redux/pokemon/pokemon-operations';
import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Row, Col } from 'antd';
import 'antd/dist/antd.css';

import 'antd/dist/antd.css';

function GalleryPage() {
  const [pokemonModal, setPokemonModal] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const dispatch = useDispatch();
  const allPokemon = useSelector(selectors.getAllPokemons);

  useEffect(() => {
    async function addFavoritPokemon() {
      const parseFavoritePokemon = JSON.parse(
        await localStorage.getItem('favoritePokemon'),
      );
      if (parseFavoritePokemon) {
        dispatch(operations.addFavoritePokemon(...parseFavoritePokemon));
      }
    }
    addFavoritPokemon();

    async function fetchData() {
      let response = await getAllPokemon(initialURL);

      setTotal(response.count);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      }),
    );
    dispatch(operations.addAllPokemon(_pokemonData));
  };

  const updatePokemon = async (pokemon, modalOpen) => {
    await setPokemonModal(pokemon.id);
    if (modalOpen) {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = currentPage => {
    if (currentPage > page) {
      next();
    } else {
      prev();
    }
    setPage(currentPage);
  };

  return (
    <div>
      {loading ? (
        <LoadingOutlined
          style={{ width: '550px', marginTop: '200px' }}
          className={style.loader}
        />
      ) : (
        <>
          <div className=" btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <Row className={style.pokemonContainer}>
            {allPokemon.map(pokemon => (
              <Col key={pokemon.name} className={style.card}>
                <Card
                  updatePokemon={updatePokemon}
                  key={pokemon.id}
                  pokemon={pokemon}
                />
              </Col>
            ))}
          </Row>
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>

          <ModalPokemonInfo
            pokemonid={pokemonModal}
            open={isOpen}
            onClose={closeModal}
          />
          <Pagination
            className={style.pagination}
            defaultCurrent={page}
            total={total}
            showSizeChanger={false}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}

export default GalleryPage;
