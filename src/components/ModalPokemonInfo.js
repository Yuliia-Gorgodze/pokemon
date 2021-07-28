import React, { useState, useEffect } from 'react';

import ReactDom from 'react-dom';
import style from './styles/modal.module.css';
import typeColors from '../helpers/color';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { getPokemonUrl } from '../services/pokemon';

function ModalPokemonInfo({ open, onClose, pokemonid }) {
  const [pokemon, setpokemon] = useState({});
  useEffect(() => {
    async function getPokemon() {
      if (pokemonid) {
        const initialURL = 'https://pokeapi.co/api/v2/pokemon';
        const url = `${initialURL}/${pokemonid}/`;
        let pokemonApi = await getPokemonUrl(url);

        setpokemon({ pokemonApi });
      }
    }
    getPokemon();
  }, [pokemonid]);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {pokemon && (
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={false}
          onClose={onClose}
          visible={open}
          onOk={onClose}
        >
          <CloseOutlined className={style.closeButton} onClick={onClose} />
          <h1 className={style.name}>{pokemon.pokemonApi?.species?.name}</h1>
          <img
            className={style.img}
            src={pokemon.pokemonApi?.sprites?.front_default}
            alt="pokemon"
          />
          <div className={style.CardTypes}>
            {pokemon.pokemonApi?.types.map(type => {
              return (
                <div
                  key={type.type.name}
                  className={style.cardType}
                  style={{ backgroundColor: typeColors[type.type.name] }}
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <ul>
            <li className={style?.weight}>
              <span>Weight:</span> <span>{pokemon.pokemonApi?.weight}</span>
            </li>
            <li className={style?.height}>
              <span>Height:</span>
              <span>{pokemon.pokemonApi?.height}</span>
            </li>
          </ul>
        </Modal>
      )}
    </>,
    document.getElementById('portal'),
  );
}

export default ModalPokemonInfo;
