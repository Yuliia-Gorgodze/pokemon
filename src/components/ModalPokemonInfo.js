import React, { useState, useEffect } from 'react';

import ReactDom from 'react-dom';
import style from './styles/modal.module.css';
import typeColors from '../helpers/color';
import { nanoid } from 'nanoid';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { getPokemonUrl } from '../services/pokemon';

function ModalPokemonInfo({ open, onClose, pokemonid }) {
  useEffect(() => {
    async function getPokemon() {
      const initialURL = 'https://pokeapi.co/api/v2/pokemon';
      const url = `${initialURL}/${pokemonid}/`;
      let pokemon = await getPokemonUrl(url);

      setpokemon({ pokemon });
    }
    getPokemon();
  }, []);
  const [pokemon, setpokemon] = useState({});

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={false}
          onClose={onClose}
          visible={open}
          onOk={onClose}
        >
          <CloseOutlined className={style.closeButton} onClick={onClose} />
          <h1 className={style.name}>{pokemon.pokemon?.species?.name}</h1>
          <img
            className={style.img}
            src={pokemon.pokemon.sprites.front_default}
            alt="pokemon"
          />
          <div className={style.CardTypes}>
            {pokemon.pokemon.types.map(type => {
              return (
                <div
                  key={nanoid()}
                  className={style.cardType}
                  style={{ backgroundColor: typeColors[type.type.name] }}
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <ul>
            <li className={style.weight}>
              <span>Weight:</span> <span>{pokemon.pokemon.weight}</span>
            </li>
            <li className={style.height}>
              <span>Height:</span>
              <span>{pokemon.pokemon.height}</span>
            </li>
          </ul>
        </Modal>
      }
    </>,
    document.getElementById('portal'),
  );
}

export default ModalPokemonInfo;
