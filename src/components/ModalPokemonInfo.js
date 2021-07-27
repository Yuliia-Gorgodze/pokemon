import React from 'react';
import ReactDom from 'react-dom';
import style from './styles/modal.module.css';
import typeColors from '../helpers/color';
import { nanoid } from 'nanoid';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export default function ModalPokemonInfo({ open, onClose, pokemon }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        onClose={onClose}
        visible={open}
        onOk={onClose}
      >
        <CloseOutlined className={style.closeButton} onClick={onClose} />
        <h1 className={style.name}>{pokemon.pokemonUrl.species.name}</h1>
        <img
          className={style.img}
          src={pokemon.pokemonUrl.sprites.front_default}
          alt="pokemon"
        />
        <div className={style.CardTypes}>
          {pokemon.pokemonUrl.types.map(type => {
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
            <span>Weight:</span> <span>{pokemon.pokemonUrl.weight}</span>
          </li>
          <li className={style.height}>
            <span>Height:</span>
            <span>{pokemon.pokemonUrl.height}</span>
          </li>
        </ul>
      </Modal>
    </>,
    document.getElementById('portal'),
  );
}
