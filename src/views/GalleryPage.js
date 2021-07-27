import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/PokemonCard';
import { getPokemon, getAllPokemon, getPokemonUrl } from '../services/pokemon';
import style from './styles/galleryPage.module.css';
import Modal from '../components/ModalPokemonInfo';
import selectors from '../redux/pokemon/pokemon-selectors';
import operations from '../redux/pokemon/pokemon-operations';
import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Row, Col } from 'antd';
import 'antd/dist/antd.css';

function GalleryPage() {
  const [pokemonModal, setPokemonModal] = useState({});
  const [page, setPage] = useState(1);
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
    const url = `${initialURL}/${pokemon.id}/`;

    let pokemonUrl = await getPokemonUrl(url);
    await setPokemonModal({ pokemonUrl });
    if (modalOpen) {
      setIsOpen(true);
    }
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
              <Col className={style.card}>
                <Card
                  updatePokemon={updatePokemon}
                  key={pokemon.id}
                  pokemon={pokemon}
                />
              </Col>
            ))}
          </Row>
          {/* <div className={`${style.pokemonContainer} `}>
            {allPokemon.map(pokemon => (
              <Card
                updatePokemon={updatePokemon}
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div> */}
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <Modal
            pokemon={pokemonModal}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />
          <Pagination
            className={style.pagination}
            defaultCurrent={page}
            total={1118}
            showSizeChanger={false}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}

export default GalleryPage;
