
import React, {useState} from 'react';

import style from './styles/card.module.css'

import {useDispatch, useSelector} from 'react-redux'
import selectors from '../redux/pokemon/pokemon-selectors'
import selectorsPage from '../redux/page/pageSelectors'
import operations from '../redux/pokemon/pokemon-operations'
import {HeartTwoTone,  DeleteTwoTone } from '@ant-design/icons';


function Card({ pokemon, updatePokemon }) {
    const dispatch = useDispatch();
  const page = useSelector(selectorsPage.getPage)

   const favoritPokemonId = useSelector(selectors.getFavoritePokemon).map(el => el.id)

 
    const handleChange = (e) =>{
        console.log();
     if(page ==='gallery' &&  e.target.nodeName === 'BUTTON'){
      e.target.classList.toggle('buttonAddFavorite')
    }
    if(e.target.nodeName === 'BUTTON'){
        addFavorite(pokemon)
    }
    if(page ==='gallery' &&  e.target.nodeName === 'IMG'){
        updatePokemon(pokemon, true)
    }
    return
    }
   
    const addFavorite  = (pokemon) => {
        console.log(favoritPokemonId);
        if(favoritPokemonId.includes(pokemon.id)){
            dispatch(operations.deleteFavoritePokemon(pokemon.id))
  
            return
        }else{
            dispatch(operations.addFavoritePokemon(pokemon))
        }  
    } 

    return (
        <div  className={`${style.baseContainer} ${style.Card}`} >
            <div className={style.Card__name}>
                {pokemon.name}
            </div>
                <img onClick={handleChange} className={style.Card__img} src={pokemon.sprites.front_default} alt="pokemon" />
            <button className={style.button} onClick={handleChange} type='button'>
                {page === 'gallery' ? <HeartTwoTone className={style.favorite}  />
                 : <DeleteTwoTone className={style.delete} />
                 }</button>
        </div>
    );
}

export default Card ;