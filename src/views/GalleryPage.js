import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/PokemonCard';
import {
  getAllPokemon,
  getPokemonType,
  getPokemonName,
} from '../services/pokemon';
import typePokemon from '../helpers/color';
import style from './styles/galleryPage.module.css';
import ModalPokemonInfo from '../components/ModalPokemonInfo';
import selectors from '../redux/pokemon/pokemon-selectors';
import operations from '../redux/pokemon/pokemon-operations';
import { LoadingOutlined } from '@ant-design/icons';
import { Pagination, Row, Col, Input, Select } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;
const { Option } = Select;

function GalleryPage() {
  const [pokemonModal, setPokemonModal] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFoundPokemon, setNotFoundPokemon] = useState(false);

  const dispatch = useDispatch();
  const favoritePokemon = useSelector(selectors.getFavoritePokemon);
  const allPokemon = useSelector(selectors.getAllPokemons);
  const typeArray = Object.keys(typePokemon);

  useEffect(() => {
    async function addFavoritPokemon() {
      const parseFavoritePokemon = JSON.parse(
        await localStorage.getItem('favoritePokemon'),
      );
      if (parseFavoritePokemon) {
        await dispatch(
          operations.addFavoritePokemon(parseFavoritePokemon, favoritePokemon),
        );
      }
    }
    addFavoritPokemon();
    async function fetchData() {
      let response = await getAllPokemon();
      setTotal(response.count);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      dispatch(operations.addAllPokemon(response.results));
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    dispatch(operations.addAllPokemon(data.results));
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    dispatch(operations.addAllPokemon(data.results));
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const updatePokemon = async (pokemon, modalOpen) => {
    if (modalOpen) {
      const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
      await setPokemonModal(pokemonId);
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

  const onChangeType = async value => {
    setLoading(true);
    const typeIndex = typeArray.indexOf(value) + 1;
    let data = await getPokemonType(typeIndex);
    dispatch(operations.addAllPokemon(data));
    setLoading(false);
    setTotal(data.length);
  };
  const onSearch = async name => {
    setLoading(true);
    let data = await getPokemonName(name);
    if (data === 404) {
      setNotFoundPokemon(true);
    } else {
      dispatch(operations.addAllPokemon([data[0]]));
      setNotFoundPokemon(false);
    }
    setLoading(false);
    setTotal(1);
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
          <div className="btn">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
            <Select onChange={onChangeType} placeholder="Enter type">
              {typeArray.map(el => {
                return (
                  <Option key={el} value={el}>
                    {el}
                  </Option>
                );
              })}
            </Select>
          </div>

          {!notFoundPokemon && (
            <Row className={style.pokemonContainer}>
              {allPokemon.length <= 20
                ? allPokemon.map(pokemon => (
                    <Col key={pokemon.name} className={style.card}>
                      <Card
                        updatePokemon={updatePokemon}
                        key={pokemon.name}
                        pokemon={pokemon}
                      />
                    </Col>
                  ))
                : allPokemon
                    .slice(
                      page * 20 - 20,
                      Math.ceil(total / 20) !== page ? page * 20 : total,
                    )
                    .map(pokemon => (
                      <Col key={pokemon.name} className={style.card}>
                        <Card
                          updatePokemon={updatePokemon}
                          key={pokemon.id}
                          pokemon={pokemon}
                        />
                      </Col>
                    ))}
            </Row>
          )}

          {notFoundPokemon && <h1>Нет такого покемона !!! </h1>}

          <ModalPokemonInfo
            pokemonid={pokemonModal}
            open={isOpen}
            onClose={closeModal}
          />

          {total >= 20 && (
            <Pagination
              className={style.pagination}
              pageSize={20}
              defaultCurrent={page}
              total={total}
              showSizeChanger={false}
              onChange={onChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GalleryPage;
